import { Module } from '@nestjs/common';
import { FileController } from './file/file.controller';
import { StatsController } from './stats/stats.controller';
import { CustomerOrderController } from './customer-order/customer-order.controller';
import { FileService } from './file/file.service';

@Module({
  controllers: [FileController, StatsController, CustomerOrderController],
  providers: [FileService],
})
export class ApiModule {}
