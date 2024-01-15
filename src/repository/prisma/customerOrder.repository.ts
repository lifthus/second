import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  CustomerOrder,
  CustomerOrderType,
} from 'src/model/CustomerOrder/CustomerOrder';
import { CustomerOrderQuerySpec } from 'src/model/CustomerOrder/QuerySpec';
import { CustomerOrderRepository } from 'src/repository/customerOrder.repository';
import { PrismaService } from 'src/repository/prisma/prisma.service';

@Injectable()
export abstract class PrismaCustomerOrderRepository extends CustomerOrderRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async findAllByYear(year: number): Promise<CustomerOrder[]> {
    const pCustomerOrders = await this.prisma.customerOrder.findMany({
      where: {
        orderDate: {
          gte: new Date(year, 0, 1),
          lt: new Date(year + 1, 0, 1),
        },
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
    const { startDate, endDate, orderType, customerId, pageSize, pageNumber } =
      qs;
    const pCustomerOrders = await this.prisma.customerOrder.findMany({
      where: {
        orderDate: {
          gte: startDate,
          lt: endDate,
        },
        orderTypeId: {
          equals: orderType?.getId(),
        },
        customerId: {
          equals: customerId,
        },
      },
      include: { orderType: true },
      skip: pageSize * (pageNumber - 1),
      take: pageSize,
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

  async save(customerOrder: CustomerOrder): Promise<CustomerOrder> {
    const pOrderTYpe = await this.prisma.customerOrderType.findUnique({
      where: { orderType: customerOrder.type.type },
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
          orderDate: customerOrder.date,
          orderAmount: customerOrder.amount,
        },
      });
    } else {
      // if persisted already, update it.
      pCustomerOrder = await this.prisma.customerOrder.update({
        where: { id: customerOrder.getId() },
        data: {
          customerId: customerOrder.getCustomerId(),
          orderType: { connect: { id: pOrderTYpe.id } },
          orderDate: customerOrder.date,
          orderAmount: customerOrder.amount,
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
