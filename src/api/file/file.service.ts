import { Injectable } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { Customer } from 'src/model/Customer/Customer';
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
    const sheetInfo = xlsx.read(file.buffer);

    let customerInfo: CustomerSheet[], orderInfo: CustomerOrderSheet[];
    if (file.originalname.endsWith('.xlsx')) {
      const sheetJSON = await this.convertXlsxToJSON(sheetInfo);
      customerInfo = sheetJSON.customerInfo;
      orderInfo = sheetJSON.orderInfo;
    } else {
      throw new Error('Invalid file type');
    }
    const customers = await this.JSONToCustomerModel(customerInfo);
    const customerOrders = await this.JSONToCustomerOrderModel(orderInfo);

    const [savedCustomers, savedCustomerOrders] = await Promise.all([
      customers.map(async (customer) => {
        return await this.customerRepository.save(customer);
      }),
      customerOrders.map(async (order) => {
        return await this.customerOrderRepository.save(order);
      }),
    ]);
  }

  private async convertXlsxToJSON(sheet: xlsx.WorkBook): Promise<{
    customerInfo: CustomerSheet[];
    orderInfo: CustomerOrderSheet[];
  }> {
    const customerInfo = xlsx.utils.sheet_to_json<CustomerSheet>(
      sheet.Sheets['customer'],
      {
        raw: false,
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
    return await Promise.all(
      sheetjson.map(async (info) => {
        const grade = await this.customerRepository.findGrade(info['고객등급']);
        return new Customer(BigInt(info['고객 id']), info['고객명'], grade);
      }),
    );
  }

  private async JSONToCustomerOrderModel(
    sheetjson: CustomerOrderSheet[],
  ): Promise<CustomerOrder[]> {
    return await Promise.all(
      sheetjson.map(async (info) => {
        const orderType = await this.customerOrderRepository.findType(
          info['주문타입'],
        );
        return new CustomerOrder(
          undefined,
          BigInt(info['주문고객 id']),
          new Date(info['주문일자']),
          orderType,
          new Decimal(info['주문금액'].replaceAll(',', '')),
        );
      }),
    );
  }
}