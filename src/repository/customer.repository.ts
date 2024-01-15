import { Injectable } from '@nestjs/common';
import { Customer } from 'src/model/Customer/Customer';

@Injectable()
export abstract class CustomerRepository {
  abstract findById(id: bigint): Promise<Customer>;
  abstract save(customer: Customer): Promise<Customer>;
}
