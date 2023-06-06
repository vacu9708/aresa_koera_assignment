import { DataSource } from 'typeorm';
import { Price } from './price.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PriceRepository {
  constructor(private dataSource: DataSource) {}

  async createPrice(price: Price): Promise<string> {
    const query = 'INSERT INTO price (aptId, data, value) VALUES (?, ?, ?)';
    const result = await this.dataSource.query(query, [price.aptId]);
    return 'success';
  }
}
