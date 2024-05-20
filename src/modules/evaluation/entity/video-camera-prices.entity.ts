import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class VideoCameraPrices {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  type: string;

}