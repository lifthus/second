import { Decimal } from '@prisma/client/runtime/library';
import { CustomerOrderStats } from 'src/model/CustomerOrder/Stats';
import {
  CustomerOrder,
  CustomerOrderType,
} from 'src/model/CustomerOrder/customerOrder';

describe('AppController', () => {
  let stats: CustomerOrderStats | undefined = undefined;
  beforeEach(async () => {
    const orders: CustomerOrder[] = [
      new CustomerOrder(
        BigInt(1),
        BigInt(1),
        new Date('2021-01-01'),
        new CustomerOrderType(BigInt(1), 'order'),
        new Decimal(1000),
      ),
      new CustomerOrder(
        BigInt(2),
        BigInt(1),
        new Date('2021-01-01'),
        new CustomerOrderType(BigInt(1), 'refund'),
        new Decimal(500),
      ),
      new CustomerOrder(
        BigInt(3),
        BigInt(1),
        new Date('2021-01-01'),
        new CustomerOrderType(BigInt(1), 'refund'),
        new Decimal(200),
      ),
      new CustomerOrder(
        BigInt(4),
        BigInt(1),
        new Date('2022-03-01'),
        new CustomerOrderType(BigInt(1), 'order'),
        new Decimal(1000),
      ),
    ];
    stats = new CustomerOrderStats(orders);
  });

  describe('CustomerOrderStats montly report', () => {
    it('should return correct monthly report in string', () => {
      expect(stats.getMonthlyStatsReport()).toBe(
        `2021년 1월 주문액 : 1,000원
2021년 1월 반품액 : 700원
2021년 1월 매출 : 300원
2022년 3월 주문액 : 1,000원
2022년 3월 반품액 : 0원
2022년 3월 매출 : 1,000원`,
      );
    });
  });
});
