import { Injectable } from '@nestjs/common';
import {
  CustomerOrder,
  CustomerOrderType,
} from 'src/model/CustomerOrder/CustomerOrder';
import { CustomerOrderQuerySpec } from 'src/model/CustomerOrder/QuerySpec';
import { CustomerOrderRepository } from 'src/repository/customerOrder.repository';
import { PrismaService } from 'src/repository/prisma/prisma.service';

@Injectable()
export class PrismaCustomerOrderRepository extends CustomerOrderRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async findAll(
    year: number | undefined = undefined,
  ): Promise<CustomerOrder[]> {
    const pCustomerOrders = await this.prisma.customerOrder.findMany({
      where: {
        orderDate:
          year !== undefined
            ? {
                gte: new Date(year, 0, 1),
                lt: new Date(year + 1, 0, 1),
              }
            : {},
      },
      include: { orderType: true },
    });
    return pCustomerOrders.map((pco) => {
      return new CustomerOrder(
        pco.id,
        pco.customerId,
        pco.orderDate,
        new CustomerOrderType(pco.orderType.id, pco.orderType.orderType),
        pco.orderAmount,
      );
    });
  }

  async findAllByQuerySpec(
    qs: CustomerOrderQuerySpec,
  ): Promise<CustomerOrder[]> {
    const { startDate, endDate, orderType, customerId, pageSize, pageNo } = qs;
    const pOrderType =
      orderType !== undefined
        ? await this.prisma.customerOrderType.findUnique({
            where: { orderType: orderType },
          })
        : undefined;
    const pCustomerOrders = await this.prisma.customerOrder.findMany({
      where: {
        orderDate: {
          gte: startDate,
          lte: endDate,
        },
        orderTypeId: {
          equals: pOrderType?.id,
        },
        customerId: {
          equals: customerId,
        },
      },
      include: { orderType: true },
      skip: pageSize * (pageNo - 1),
      take: pageSize,
      orderBy: { orderDate: 'desc' },
    });
    return pCustomerOrders.map((pco) => {
      return new CustomerOrder(
        pco.id,
        pco.customerId,
        pco.orderDate,
        new CustomerOrderType(pco.orderType.id, pco.orderType.orderType),
        pco.orderAmount,
      );
    });
  }

  async findType(type: string): Promise<CustomerOrderType> {
    const pOrderType = await this.prisma.customerOrderType.findUnique({
      where: { orderType: type },
    });
    return new CustomerOrderType(pOrderType.id, pOrderType.orderType);
  }

  async getTypeMap(): Promise<Map<string, CustomerOrderType>> {
    const pOrderTypes = await this.prisma.customerOrderType.findMany();
    const typeMap = new Map<string, CustomerOrderType>();
    pOrderTypes.forEach((ot) => {
      typeMap.set(ot.orderType, new CustomerOrderType(ot.id, ot.orderType));
    });
    return typeMap;
  }

  async save(customerOrder: CustomerOrder): Promise<CustomerOrder> {
    const pOrderTYpe = await this.prisma.customerOrderType.findUnique({
      where: { orderType: customerOrder.getType().type },
    });
    if (pOrderTYpe === null) {
      throw new Error('Order Type not found');
    }

    // first check if the customer is already persisted.
    let pCustomerOrder =
      customerOrder.getId() !== undefined
        ? await this.prisma.customerOrder.findUnique({
            where: { id: customerOrder.getId() },
          })
        : null;
    if (pCustomerOrder === null) {
      // if it isn't persisted yet, create a new customer.
      pCustomerOrder = await this.prisma.customerOrder.create({
        data: {
          id: customerOrder.getId(),
          customerId: customerOrder.getCustomerId(),
          orderType: { connect: { id: pOrderTYpe.id } },
          orderDate: customerOrder.getDate(),
          orderAmount: customerOrder.getAmount(),
        },
      });
    } else {
      // if persisted already, update it.
      pCustomerOrder = await this.prisma.customerOrder.update({
        where: { id: customerOrder.getId() },
        data: {
          customerId: customerOrder.getCustomerId(),
          orderType: { connect: { id: pOrderTYpe.id } },
          orderDate: customerOrder.getDate(),
          orderAmount: customerOrder.getAmount(),
        },
      });
    }

    return new CustomerOrder(
      pCustomerOrder.id,
      pCustomerOrder.customerId,
      pCustomerOrder.orderDate,
      new CustomerOrderType(pOrderTYpe.id, pOrderTYpe.orderType),
      pCustomerOrder.orderAmount,
    );
  }
}
