import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsBigInt } from 'src/common/decorator/validate/validate';
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
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  @IsDate()
  public readonly startDate: Date | undefined;

  @Transform(({ value }) => new Date(value))
  @IsOptional()
  @IsDate()
  public readonly endDate: Date | undefined;

  @IsOptional()
  @IsString()
  public readonly orderType: string | undefined;

  @Transform(({ value }) => {
    try {
      return BigInt(value);
    } catch (e) {
      return 'not bigint';
    }
  })
  @IsOptional()
  @IsBigInt()
  public readonly customerId: bigint | undefined;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  public readonly pageSize: number | undefined;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  public readonly pageNo: number | undefined;
}
