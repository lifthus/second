import { CustomerOrderType } from 'src/model/CustomerOrder/customerOrder';

export class CustomerOrderQuerySpec {
  constructor(
    readonly startDate: Date | undefined = undefined,
    readonly endDate: Date | undefined = undefined,
    readonly orderType: CustomerOrderType | undefined = undefined,
    readonly customerId: bigint | undefined = undefined,
    readonly pageSize: number = 50,
    readonly pageNumber: number = 1,
  ) {}
}
