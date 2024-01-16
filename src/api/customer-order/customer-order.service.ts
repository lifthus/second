import { Injectable } from '@nestjs/common';
import {
  CustomerOrderDTO,
  CustomerOrderQuerySpecDTO,
} from 'src/api/customer-order/customer-order.dto';
import { CustomerOrderQuerySpec } from 'src/model/CustomerOrder/QuerySpec';
import { CustomerOrderRepository } from 'src/repository/customerOrder.repository';

@Injectable()
export class CustomerOrderService {
  constructor(
    private readonly customerOrderRepository: CustomerOrderRepository,
  ) {}

  async findCustomerOrdersBySpec(
    qs: CustomerOrderQuerySpecDTO,
  ): Promise<CustomerOrderDTO[]> {
    const spec = new CustomerOrderQuerySpec(qs);
    const customerOrders =
      await this.customerOrderRepository.findAllByQuerySpec(spec);

    return CustomerOrderDTO.fromModels(customerOrders);
  }
}
