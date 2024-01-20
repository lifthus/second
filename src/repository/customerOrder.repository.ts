import { Injectable } from '@nestjs/common';
import {
  CustomerOrder,
  CustomerOrderType,
} from 'src/model/CustomerOrder/CustomerOrder';
import { CustomerOrderQuerySpec } from 'src/model/CustomerOrder/QuerySpec';

@Injectable()
export abstract class CustomerOrderRepository {
  abstract findAll(year: number | undefined): Promise<CustomerOrder[]>;
  abstract findAllByQuerySpec(
    querySpec: CustomerOrderQuerySpec,
  ): Promise<CustomerOrder[]>;
  abstract findType(type: string): Promise<CustomerOrderType>;
  abstract getTypeMap(): Promise<Map<string, CustomerOrderType>>;
  abstract save(customerOrder: CustomerOrder): Promise<CustomerOrder>;
  abstract insertMany(customerOrders: CustomerOrder[]): Promise<Number>;
}
