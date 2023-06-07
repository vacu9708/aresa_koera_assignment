import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePriceDto } from './create_price.dto';
import { PriceRepository } from './price.repository';
import { Price } from './price.entity';

@Injectable()
export class PriceService {
  current_date: number;
  constructor(
    private priceRepository: PriceRepository, // @InjectRepository(Price) private repository: Repository<Price>,
  ) {
    this.current_date = 2023 + 6 / 12; //new Date().getFullYear() + (new Date().getMonth() + 1) / 12
  }

  async getHistoricalPrice(
    aptId: number,
    year: number,
    monthStart: number,
    monthEnd: number,
  ): Promise<Price[]> {
    // invalid date
    if (!(1 <= monthStart && monthStart <= monthEnd && monthEnd <= 12)) {
      throw new BadRequestException('Invalid date');
    }
    const startDate = new Date(year, monthStart - 1),
      endDate = new Date(year, monthEnd - 1);
    // 과거 정보만 가능
    if (this.current_date <= year + monthEnd / 12) {
      throw new BadRequestException('Only past info allowed');
    }
    // 범위 검색
    return (
      await this.priceRepository.findRange(aptId, startDate, endDate)
    ).map((pair: any) => pair.value);
  }

  async setHistoricalPrice(reqBody: CreatePriceDto): Promise<boolean> {
    let year = reqBody.year,
      month = reqBody.monthStart;
    // 과거 정보만 가능
    if (this.current_date <= year + (month + reqBody.values.length - 1) / 12) {
      throw new BadRequestException('Only past info allowed');
    }
    // DB에 가격 정보 넣기
    for (let i = 0; i < reqBody.values.length; i++) {
      const price = {
        aptId: reqBody.aptId,
        date: new Date(year, month - 1),
        value: reqBody.values[i],
      };
      await this.priceRepository.save(price);
      // 12월이 최대임
      if (month === 12) {
        month = 1;
        year += 1;
      } else month += 1;
    }
    return true;
  }

  async getFuturePrice(
    aptId: number,
    year: number,
    monthStart: number,
    monthEnd: number,
  ): Promise<Price[]> {
    // invalid date
    if (!(1 <= monthStart && monthStart <= monthEnd && monthEnd <= 12)) {
      throw new BadRequestException('Invalid date');
    }
    const startDate = new Date(year, monthStart - 1),
      endDate = new Date(year, monthEnd - 1);
    // 미래 정보만 가능
    if (this.current_date > year + monthStart / 12) {
      throw new BadRequestException('Only future info allowed');
    }
    // 범위 검색
    return (
      await this.priceRepository.findRange(aptId, startDate, endDate)
    ).map((pair) => pair.value);
  }

  async setFuturePrice(reqBody: CreatePriceDto): Promise<boolean> {
    let year = reqBody.year,
      month = reqBody.monthStart;
    // 미래 정보만 가능
    if (this.current_date > year + month / 12)
      throw new BadRequestException('Only future info allowed');
    // DB에 가격 기록 넣기
    for (let i = 0; i < reqBody.values.length; i++) {
      const price = {
        aptId: reqBody.aptId,
        date: new Date(year, month - 1),
        value: reqBody.values[i],
      };
      await this.priceRepository.save(price);
      // 12월이 최대임
      if (month === 12) {
        month = 1;
        year += 1;
      } else month += 1;
    }
    return true;
  }
}
