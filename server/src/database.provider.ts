import { DataSource } from 'typeorm';
import { Price } from './price/price.entity';
import { Module } from '@nestjs/common';

const databaseProvider = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123',
        database: 'real_estate',
        entities: [Price],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];

@Module({
  providers: [...databaseProvider],
  exports: [...databaseProvider],
})
export class DatabaseProvider {}
