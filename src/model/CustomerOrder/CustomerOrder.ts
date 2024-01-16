import { Decimal } from '@prisma/client/runtime/library';

export class CustomerOrder {
  constructor(
    private id: bigint | undefined,
    private customerId: bigint,
    private orderDate: Date,
    private orderType: CustomerOrderType,
    private orderAmount: Decimal,
  ) {}

  getId(): bigint | undefined {
    return this.id;
  }

  getCustomerId(): bigint {
    return this.customerId;
  }

  getDate(): Date {
    return this.orderDate;
  }
  getType(): CustomerOrderType {
    return this.orderType;
  }
  getAmount(): Decimal {
    return this.orderAmount;
  }
}

export class CustomerOrderType {
  constructor(
    private id: number | undefined,
    private orderType: string,
  ) {}

  getId(): number | undefined {
    return this.id;
  }

  get type(): string {
    return this.orderType;
  }
}
