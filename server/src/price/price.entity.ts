import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Price {
  @PrimaryColumn()
  aptId: number;

  @PrimaryColumn({ type: 'date' })
  date: Date;

  @Column()
  value: number;
}
