import { Test, TestingModule } from '@nestjs/testing';
import { CustomerOrderService } from './customer-order.service';
import { RepositoryModule } from 'src/repository/repository.module';

describe('CustomerOrderService', () => {
  let service: CustomerOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RepositoryModule],
      providers: [CustomerOrderService],
    }).compile();

    service = module.get<CustomerOrderService>(CustomerOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
