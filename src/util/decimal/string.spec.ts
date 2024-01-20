import { Decimal } from '@prisma/client/runtime/library';
import { decimalToCommaSeparatedString } from 'src/util/decimal/string';

describe('Decimal string utils', () => {
  describe('Decimal comma-separated string transformation', () => {
    it('should return "1,234,567"', () => {
      expect(decimalToCommaSeparatedString(new Decimal(1234567))).toBe(
        '1,234,567',
      );
    });
    it('should return "1,234.56789"', () => {
      expect(decimalToCommaSeparatedString(new Decimal(1234.56789))).toBe(
        '1,234.56789',
      );
    });
    it('shold return "123,456.789"', () => {
      expect(decimalToCommaSeparatedString(new Decimal(123456.789))).toBe(
        '123,456.789',
      );
    });
    it('should return "1,000"', () => {
      expect(decimalToCommaSeparatedString(new Decimal(1000))).toBe('1,000');
    });
    it('should return "-123,456', () => {
      expect(decimalToCommaSeparatedString(new Decimal(-123456))).toBe(
        '-123,456',
      );
    });
  });
});
