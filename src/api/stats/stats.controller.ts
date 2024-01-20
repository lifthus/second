import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { StatsYearQueryDTO } from 'src/api/stats/stats.dto';
import { StatsService } from 'src/api/stats/stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('monthly')
  @ApiQuery({
    name: 'year',
    required: false,
    description: 'Year to get monthly stats for. it is optional.',
  })
  async getMonthlyStats(@Query() { year }: StatsYearQueryDTO) {
    return await this.statsService.getMonthlyStats(year);
  }
}
