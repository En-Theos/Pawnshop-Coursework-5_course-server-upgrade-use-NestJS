import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class TvPrices {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  type: string;

}