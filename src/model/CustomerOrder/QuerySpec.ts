import { CustomerOrderQuerySpecDTO } from 'src/api/customer-order/customer-order.dto';

export class CustomerOrderQuerySpec {
  readonly startDate: Date | undefined;
  readonly endDate: Date | undefined;
  readonly orderType: string | undefined;
  readonly customerId: bigint | undefined;
  readonly pageSize: number = 50;
  readonly pageNo: number = 1;
  constructor(dto: CustomerOrderQuerySpecDTO) {
    this.startDate = dto.startDate;
    this.endDate = dto.endDate;
    this.orderType = dto.orderType;
    this.customerId = dto.customerId;
    this.pageSize = dto.pageSize || 50;
    this.pageNo = dto.pageNo || 1;
  }
}
