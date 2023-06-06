import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Price {
  @PrimaryGeneratedColumn()
  aptId: number;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  value: number;
}
