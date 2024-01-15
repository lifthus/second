import { Injectable } from '@nestjs/common';
import { CustomerOrder } from 'src/model/CustomerOrder/CustomerOrder';
import { CustomerOrderQuerySpec } from 'src/model/CustomerOrder/QuerySpec';

@Injectable()
export abstract class CustomerOrderRepository {
  abstract findAllByYear(year: number): Promise<CustomerOrder[]>;
  abstract findAllByQuerySpec(
    querySpec: CustomerOrderQuerySpec,
  ): Promise<CustomerOrder[]>;
  abstract save(CustomerOrder: CustomerOrder): Promise<CustomerOrder>;
}
