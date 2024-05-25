import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class MetalPrices {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  type: string;

  @Column({ type: "int" })
  rating: number;

  @Column({ type: "int" })
  sample: number;
  
}