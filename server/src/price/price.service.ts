import { Injectable } from '@nestjs/common';
import { CreatePriceDto } from './create_price.dto';
import { PriceRepository } from './price.repository';
import { Price } from './price.entity';

@Injectable()
export class PriceService {
  constructor(private readonly priceRepository: PriceRepository) {}

  createPrice(newTodo: CreatePriceDto): Promise<Price> {
    return;
  }
}
