import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
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
  async queryBySpec(@Query() query) {
    const dto = new CustomerOrderQuerySpecDTO(query);
    return await this.customerOrderService.findCustomerOrdersBySpec(dto);
  }
}
