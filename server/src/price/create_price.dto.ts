import { IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class CreatePriceDto {
  @IsNotEmpty()
  @IsNumber()
  readonly aptId: number;
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly year: number;
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(12)
  readonly monthStart: number;
  @IsNotEmpty()
  @Min(0)
  readonly values: number[];
}
