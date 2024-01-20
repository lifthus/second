import { Injectable } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { InvalidFileException } from 'src/common/exception/service/ServiceException';
import { Customer, CustomerGrade } from 'src/model/Customer/Customer';
import { CustomerOrder } from 'src/model/CustomerOrder/CustomerOrder';
import { CustomerRepository } from 'src/repository/customer.repository';
import { CustomerOrderRepository } from 'src/repository/customerOrder.repository';
import * as xlsx from 'xlsx';

type CustomerSheet = {
  '고객 id': string;
  고객명: string;
  고객등급: string;
};

type CustomerOrderSheet = {
  '주문고객 id': string;
  주문일자: string;
  주문타입: string;
  주문금액: string;
};

@Injectable()
export class FileService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly customerOrderRepository: CustomerOrderRepository,
  ) {}

  async parseComplexInfoAndPersist(file: Express.Multer.File) {
    if (!file.originalname.endsWith('.xlsx'))
      throw InvalidFileException('Only .xlsx spreadsheet file is allowed.');

    // file to spreadsheet info
    const sheetInfo = this.readSpreadsheet(file);

    // convert spreadsheet info to json objects
    const sheetJSON = await this.convertXlsxToJSON(sheetInfo);
    const customerInfo = sheetJSON.customerInfo;
    const orderInfo = sheetJSON.orderInfo;

    // convert json objects to domain models
    const customers = await this.JSONToCustomerModel(customerInfo);
    const customerOrders = await this.JSONToCustomerOrderModel(orderInfo);

    // first, insert the customers, because customerOrders has foreign key constraint about customer.
    const savedCustomersCount =
      await this.customerRepository.insertMany(customers);
    const savedCustomerOrdersCount =
      await this.customerOrderRepository.insertMany(customerOrders);

    return { savedCustomersCount, savedCustomerOrdersCount };
  }

  private readSpreadsheet(file: Express.Multer.File): xlsx.WorkBook {
    try {
      return xlsx.read(file.buffer);
    } catch (e) {
      throw InvalidFileException('Only .xlsx spreadsheet file is allowed.');
    }
  }

  private async convertXlsxToJSON(sheet: xlsx.WorkBook): Promise<{
    customerInfo: CustomerSheet[];
    orderInfo: CustomerOrderSheet[];
  }> {
    const customerInfo = xlsx.utils.sheet_to_json<CustomerSheet>(
      sheet.Sheets['customer'],
      {
        raw: false, // this options is to get all values as string.
      },
    );
    const orderInfo = xlsx.utils.sheet_to_json<CustomerOrderSheet>(
      sheet.Sheets['order'],
      {
        raw: false,
      },
    );
    return { customerInfo, orderInfo };
  }

  private async JSONToCustomerModel(
    sheetjson: CustomerSheet[],
  ): Promise<Customer[]> {
    const gradeMap = await this.customerRepository.getGradeMap();
    return await Promise.all(
      sheetjson.map(async (info) => {
        return new Customer(
          BigInt(info['고객 id']),
          info['고객명'],
          gradeMap.get(info['고객등급']),
        );
      }),
    );
  }

  private async JSONToCustomerOrderModel(
    sheetjson: CustomerOrderSheet[],
  ): Promise<CustomerOrder[]> {
    const typeMap = await this.customerOrderRepository.getTypeMap();
    return await Promise.all(
      sheetjson.map(async (info) => {
        return new CustomerOrder(
          undefined,
          BigInt(info['주문고객 id']),
          new Date(info['주문일자']),
          typeMap.get(info['주문타입']),
          new Decimal(info['주문금액'].replaceAll(',', '')),
        );
      }),
    );
  }
}
