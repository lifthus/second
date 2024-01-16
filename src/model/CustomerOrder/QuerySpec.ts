import { CustomerOrderQuerySpecDTO } from 'src/api/customer-order/customer-order.dto';
import { CustomerOrderType } from 'src/model/CustomerOrder/customerOrder';

export class CustomerOrderQuerySpec {
  readonly startDate: Date | undefined;
  readonly endDate: Date | undefined;
  readonly orderType: string | undefined;
  readonly customerId: bigint | undefined;
  readonly pageSize: number = 50;
  readonly pageNo: number = 1;
  constructor(dto: CustomerOrderQuerySpecDTO) {
    this.startDate = !isNaN(dto.startDate.getTime())
      ? dto.startDate
      : undefined;
    this.endDate = !isNaN(dto.endDate.getTime()) ? dto.endDate : undefined;
    this.orderType = dto.orderType;
    this.customerId =
      dto.customerId !== undefined ? BigInt(dto.customerId) : undefined;
    this.pageSize = Number(dto.pageSize) || 50;
    this.pageNo = Number(dto.pageNo) || 1;
  }
}
