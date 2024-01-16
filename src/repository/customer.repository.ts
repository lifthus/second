import { Injectable } from '@nestjs/common';
import { Customer, CustomerGrade } from 'src/model/Customer/Customer';

@Injectable()
export abstract class CustomerRepository {
  abstract findById(id: bigint): Promise<Customer>;
  abstract findGrade(grade: string): Promise<CustomerGrade>;
  abstract getGradeMap(): Promise<Map<string, CustomerGrade>>;
  abstract save(customer: Customer): Promise<Customer>;
}
