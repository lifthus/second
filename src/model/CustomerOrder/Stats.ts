import { Decimal } from '@prisma/client/runtime/library';
import { CustomerOrder } from 'src/model/CustomerOrder/CustomerOrder';
import { decimalToCommaSeparatedString } from 'src/util/decimal/string';

export class CustomerOrderStats {
  constructor(private orders: CustomerOrder[]) {}

  public getMonthlyStatsReport(): string {
    // year -> month -> { order, refund }
    const ymo: {
      [year: number]: { [month: number]: { order: Decimal; refund: Decimal } };
    } = {};

    // traverse each order
    for (const order of this.orders) {
      const year = order.getDate().getFullYear();
      const month = order.getDate().getMonth() + 1;
      const orderType = order.getType().type; // order or refund

      // initialize year and month if not exists
      const y = (ymo[year] = ymo[year] || {});
      const m = (y[month] = y[month] || {
        order: new Decimal(0),
        refund: new Decimal(0),
      });

      // accumulate order or refund amount
      if (orderType === 'order') {
        m.order = m.order.add(order.getAmount());
      } else if (orderType === 'refund') {
        m.refund = m.refund.add(order.getAmount());
      } else {
        throw new Error('invalid order type');
      }
    }

    // generate report in string
    let report = '';
    for (const year of Object.keys(ymo)
      .map((ys) => Number(ys))
      .sort()) {
      const mo = ymo[year];
      for (const month of Object.keys(mo)
        .map((ms) => Number(ms))
        .sort()) {
        const { order, refund } = mo[month];
        report += `${year}년 ${month}월 주문액 : ${decimalToCommaSeparatedString(
          order,
        )}원\n`;
        report += `${year}년 ${month}월 반품액 : ${decimalToCommaSeparatedString(
          refund,
        )}원\n`;
        report += `${year}년 ${month}월 매출 : ${decimalToCommaSeparatedString(
          order.sub(refund),
        )}원\n`;
      }
    }

    return report.trim();
  }
}
