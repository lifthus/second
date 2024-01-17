import { Injectable } from '@nestjs/common';
import {
  CustomerOrderDTO,
  CustomerOrderKoreanJSON,
  CustomerOrderQuerySpecDTO,
} from 'src/api/customer-order/customer-order.dto';
import { CustomerOrderQuerySpec } from 'src/model/CustomerOrder/QuerySpec';
import { CustomerRepository } from 'src/repository/customer.repository';
import { CustomerOrderRepository } from 'src/repository/customerOrder.repository';

@Injectable()
export class CustomerOrderService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly customerOrderRepository: CustomerOrderRepository,
  ) {}

  async findCustomerOrdersBySpec(
    qs: CustomerOrderQuerySpecDTO,
  ): Promise<CustomerOrderKoreanJSON[]> {
    const spec = new CustomerOrderQuerySpec(qs);
    const customerOrders =
      await this.customerOrderRepository.findAllByQuerySpec(spec);

    return await Promise.all(
      customerOrders.map(async (co) => {
        const c = await this.customerRepository.findById(co.getCustomerId());
        return CustomerOrderDTO.fromModel(co, c).toKoreanJSON();
      }),
    );
  }
}
