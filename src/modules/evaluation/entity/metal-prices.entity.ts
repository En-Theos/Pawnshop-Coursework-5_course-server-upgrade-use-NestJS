import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class MetalPrices {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  rating: number;

  @Column()
  sample: number
}