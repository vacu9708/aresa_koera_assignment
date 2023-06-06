import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePriceDto {
  @IsNotEmpty()
  @IsNumber()
  readonly aptId: number;
  @IsNotEmpty()
  @IsNumber()
  readonly year: number;
  @IsNotEmpty()
  @IsNumber()
  readonly monthStart: number;
  @IsNotEmpty()
  @IsNumber()
  readonly values: number[];
}
