import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { CustomerOrderQuerySpecDTO } from 'src/api/customer-order/customer-order.dto';
import { CustomerOrderService } from 'src/api/customer-order/customer-order.service';

@Controller('customer-order')
export class CustomerOrderController {
  constructor(private readonly customerOrderService: CustomerOrderService) {}

  @Get()
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiQuery({ name: 'orderType', required: false })
  @ApiQuery({ name: 'customerId', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiQuery({ name: 'pageNo', required: false })
  async queryBySpec(@Query() qs: CustomerOrderQuerySpecDTO) {
    return await this.customerOrderService.findCustomerOrdersBySpec(qs);
  }
}
