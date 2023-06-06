import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
  Body,
} from '@nestjs/common';
import { PriceService } from './price.service';
import { CreatePriceDto } from './create_price.dto';
import { Price } from './price.entity';

@Controller()
export class PriceController {
  constructor(private readonly appService: PriceService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  createPrice(@Body() newPrice: CreatePriceDto): Promise<Price> {
    return this.appService.createPrice(newPrice);
  }
}
