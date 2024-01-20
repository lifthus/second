import { Module } from '@nestjs/common';
import { CustomerRepository } from 'src/repository/customer.repository';
import { CustomerOrderRepository } from 'src/repository/customerOrder.repository';
import { PrismaCustomerRepository } from 'src/repository/prisma/customer.repository';
import { PrismaCustomerOrderRepository } from 'src/repository/prisma/customerOrder.repository';
import { PrismaService } from 'src/repository/prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    { provide: CustomerRepository, useClass: PrismaCustomerRepository },
    {
      provide: CustomerOrderRepository,
      useClass: PrismaCustomerOrderRepository,
    },
  ],
  exports: [CustomerRepository, CustomerOrderRepository],
})
export class RepositoryModule {}
