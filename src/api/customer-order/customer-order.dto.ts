import { CustomerOrder } from 'src/model/CustomerOrder/CustomerOrder';

export class CustomerOrderDTO {
  private constructor(
    public readonly id: string,
    public readonly customerId: string,
    public readonly orderDate: Date,
    public readonly orderType: string,
    public readonly orderAmount: string,
  ) {}

  public static fromModel(co: CustomerOrder): CustomerOrderDTO {
    return new CustomerOrderDTO(
      co.getId().toString(),
      co.getCustomerId().toString(),
      co.getDate(),
      co.getType().type,
      co.getAmount().toString(),
    );
  }

  public static fromModels(cos: CustomerOrder[]): CustomerOrderDTO[] {
    return cos.map((item) => {
      return this.fromModel(item);
    });
  }
}

export class CustomerOrderQuerySpecDTO {
  public readonly startDate: Date | undefined;
  public readonly endDate: Date | undefined;
  public readonly orderType: string | undefined;
  public readonly customerId: string | undefined;
  public readonly pageSize: number | undefined;
  public readonly pageNo: number | undefined;
  constructor(query: any) {
    this.startDate = new Date(query.startDate);
    this.endDate = new Date(query.endDate);
    this.orderType = query.orderType;
    this.customerId = query.customerId;
    this.pageSize = Number(query.pageSize);
    this.pageNo = Number(query.pageNo);
  }
}
