import { Module } from '@nestjs/common';
import { PriceController } from './price.controller';
import { PriceService } from './price.service';
import { Price } from './price.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceRepository } from './price.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Price])],
  controllers: [PriceController],
  providers: [PriceService, PriceRepository],
})
export class PriceModule {}
