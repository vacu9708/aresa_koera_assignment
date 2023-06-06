import { IsDefined, IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class CreatePriceDto {
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @MinLength(2)
  readonly value: number;
}
