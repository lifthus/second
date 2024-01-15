import { Module } from '@nestjs/common';
import { FileController } from './file/file.controller';
import { StatsController } from './stats/stats.controller';
import { CustomerOrderController } from './customer-order/customer-order.controller';
import { FileService } from './file/file.service';
import { RepositoryModule } from 'src/repository/repository.module';
import { StatsService } from './stats/stats.service';

@Module({
  imports: [RepositoryModule],
  controllers: [FileController, StatsController, CustomerOrderController],
  providers: [FileService, StatsService],
})
export class ApiModule {}
