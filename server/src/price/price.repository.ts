import { Repository } from 'typeorm';
import { Price } from './price.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PriceRepository {
  constructor(@InjectRepository(Price) private repo: Repository<Price>) {}

  async findRange(aptId: number, startDate: Date, endDate: Date): Promise<any> {
    const query = `
      SELECT value
      FROM price
      WHERE aptId = ? AND date >= ? AND date <= ?
      ORDER BY date
    `;
    try {
      return await this.repo.query(query, [aptId, startDate, endDate]);
    } catch (error) {
      console.error(error);
    }
  }

  async save(price: Price): Promise<boolean> {
    // insert만 필요할 땐 검색할 필요가 없어서 좀 느릴 수도 있을 듯
    try {
      const existingPrice = await this.repo.findOne({
        where: {
          aptId: price.aptId,
          date: price.date,
        },
      });
      // 존재하면 update, 아니면 insert
      if (existingPrice) {
        existingPrice.value = price.value;
        await this.repo.save(existingPrice);
      } else {
        await this.repo.save(price);
      }
      return true;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'An error occurred while fetching data from the database',
      );
    }
  }

  // async createPrice(price: Price): Promise<boolean> {
  //   const query = 'INSERT INTO price (aptId, date, value) VALUES (?, ?, ?)';
  //   try {
  //     await this.repo.query(query, [
  //       price.aptId,
  //       price.date,
  //       price.value,
  //     ]);
  //     return true;
  //   } catch (error) {
  //     console.error(error);
  //     return false;
  //   }
  // }

  // async updatePrice(price: Price): Promise<boolean> {
  //   const query =
  //     'UPDATE price SET value = ?\
  //      WHERE aptId = ? and date = ?;';
  //   try {
  //     await this.repo.query(query, [
  //       price.value,
  //       price.aptId,
  //       price.date,
  //     ]);
  //     return true;
  //   } catch (error) {
  //     console.error(error);
  //     return false;
  //   }
  // }
}
