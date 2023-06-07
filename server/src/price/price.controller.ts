import {
  UseInterceptors,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { PriceService } from './price.service';
import { CreatePriceDto } from './create_price.dto';
import { Price } from './price.entity';

@Controller()
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Get('aresa-api/historical_price')
  //@UseInterceptors(ClassSerializerInterceptor) // converts javascript object into json for the response
  getHistoricalPrice(
    @Query('aptId', ParseIntPipe) aptId: number,
    @Query('year', ParseIntPipe) year: number,
    @Query('monthStart', ParseIntPipe) monthStart: number,
    @Query('monthEnd', ParseIntPipe) monthEnd: number,
  ): Promise<Price[]> {
    return this.priceService.getHistoricalPrice(
      aptId,
      year,
      monthStart,
      monthEnd,
    );
  }

  @Post('aresa-api/historical_price')
  setHistoricalPrice(@Body() reqBody: CreatePriceDto): Promise<boolean> {
    return this.priceService.setHistoricalPrice(reqBody);
  }

  @Get('aresa-api/historical_price')
  //@UseInterceptors(ClassSerializerInterceptor) // converts javascript object into json for the response
  getFuturePrice(
    @Query('aptId') aptId: number,
    @Query('year') year: number,
    @Query('monthStart') monthStart: number,
    @Query('monthEnd') monthEnd: number,
  ): Promise<Price[]> {
    return this.priceService.getHistoricalPrice(
      aptId,
      year,
      monthStart,
      monthEnd,
    );
  }

  @Post('aresa-api/future_price')
  setFuturePrice(@Body() reqBody: CreatePriceDto): Promise<boolean> {
    return this.priceService.setFuturePrice(reqBody);
  }
}
