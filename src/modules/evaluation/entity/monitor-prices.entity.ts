import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class MonitorPrices {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  type: string;

}