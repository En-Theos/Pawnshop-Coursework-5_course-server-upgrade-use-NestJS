import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class PhonePrices {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 200 })
  name: string;

  @Column({ type: "decimal", width: 10.2 })
  price: number;

  @Column({ type: "varchar", length: 150 })
  type: string;

}