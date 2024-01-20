import { Decimal } from '@prisma/client/runtime/library';

export function decimalToCommaSeparatedString(d: Decimal): string {
  let ds = d.toString();

  let negative: boolean;
  if (ds.startsWith('-')) negative = true;
  ds = ds.replace('-', '');

  let decimalPointIndex = ds.indexOf('.');
  decimalPointIndex = decimalPointIndex === -1 ? ds.length : decimalPointIndex;
  const fractPart = ds.slice(decimalPointIndex);

  let rds = ds.slice(0, decimalPointIndex).split('').reverse().join('');

  let result = '';
  for (let i = 0; i < rds.length; i++) {
    if (i % 3 === 0 && i !== 0) {
      result += ',';
    }
    result += rds[i];
  }

  return (
    (negative ? '-' : '') + result.split('').reverse().join('') + fractPart
  );
}
