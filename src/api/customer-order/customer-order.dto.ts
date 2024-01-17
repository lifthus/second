import { Customer } from 'src/model/Customer/Customer';
import { CustomerOrder } from 'src/model/CustomerOrder/CustomerOrder';

export class CustomerOrderDTO {
  private constructor(
    public readonly id: string,
    public readonly orderDate: Date,
    public readonly customerName: string,
    public readonly customerGrade: string,
    public readonly orderType: string,
    public readonly orderAmount: string,
  ) {}

  public static fromModel(co: CustomerOrder, c: Customer): CustomerOrderDTO {
    return new CustomerOrderDTO(
      co.getId().toString(),
      co.getDate(),
      c.getName(),
      c.getGrade().getGrade(),
      co.getType().type,
      co.getAmount().toString(),
    );
  }

  public toKoreanJSON(): CustomerOrderKoreanJSON {
    return {
      주문일자: this.orderDate,
      주문고객명: this.customerName,
      '주문고객 등급': this.customerGrade,
      주문타입: this.orderType,
      주문금액: this.orderAmount,
    };
  }
}

export type CustomerOrderKoreanJSON = {
  주문일자: Date;
  주문고객명: string;
  '주문고객 등급': string;
  주문타입: string;
  주문금액: string;
};

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
