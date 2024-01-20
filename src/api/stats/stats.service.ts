import { Injectable } from '@nestjs/common';
import { CustomerOrderStats } from 'src/model/CustomerOrder/Stats';
import { CustomerOrderRepository } from 'src/repository/customerOrder.repository';

@Injectable()
export class StatsService {
  constructor(
    private readonly customerOrderRepository: CustomerOrderRepository,
  ) {}

  async getMonthlyStats(year: number | undefined) {
    const orders = await this.customerOrderRepository.findAll(year);
    const monthlyStats = new CustomerOrderStats(orders);
    return monthlyStats.getMonthlyStatsReport();
  }
}
