import { Injectable } from '@nestjs/common';
import { Customer, CustomerGrade } from 'src/model/Customer/Customer';
import { Customer as PCustomer, Prisma } from '@prisma/client';
import { CustomerRepository } from 'src/repository/customer.repository';
import { PrismaService } from 'src/repository/prisma/prisma.service';

@Injectable()
export class PrismaCustomerRepository extends CustomerRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async findById(id: bigint): Promise<Customer> {
    const pcustomer = await this.prisma.customer.findUnique({
      where: { id: id },
      include: { grade: true },
    });
    return new Customer(
      pcustomer.id,
      pcustomer.name,
      new CustomerGrade(pcustomer.grade.id, pcustomer.grade.grade),
    );
  }

  async save(customer: Customer): Promise<Customer> {
    const pGrade = await this.prisma.customerGrade.findUnique({
      where: { grade: customer.getGrade().getGrade() },
    });
    if (pGrade === null) {
      throw new Error('Grade not found');
    }

    // first check if the customer is already persisted.
    let pcustomer =
      customer.getId() !== undefined
        ? await this.prisma.customer.findUnique({
            where: { id: customer.getId() },
          })
        : null;
    if (pcustomer === null) {
      // if the id is not set or the customer isn't persisted yet,
      // create a new customer.
      var a: Prisma.CustomerCreateInput;
      pcustomer = await this.prisma.customer.create({
        data: {
          id: customer.getId(),
          name: customer.getName(),
          grade: { connect: { id: pGrade.id } },
        },
      });
    } else {
      // if customer is already persisted, update it.
      pcustomer = await this.prisma.customer.update({
        where: { id: customer.getId() },
        data: {
          name: customer.getName(),
          grade: { connect: { id: pGrade.id } },
        },
      });
    }

    return new Customer(pcustomer.id, pcustomer.name, customer.getGrade());
  }
}
