import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class StatsYearQueryDTO {
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  readonly year: number | undefined;
}
