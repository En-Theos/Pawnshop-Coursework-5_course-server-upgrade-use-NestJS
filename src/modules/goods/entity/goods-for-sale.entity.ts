import { Bids } from "src/modules/lots/entity/bids.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

export enum State {
  EXCELLENT = "Відмінний",
  GOOD = "Хороший",
  SATISFACTORY = "Задовільний",
  BAD = "Поганий",
  BROKEN = "Зламано"
}

export enum Category {
  SALE = "Продаж",
  AUCTION = "Аукціон"
}

export enum Status {
  AWAITS = "очікує",
  PROCESSING = "в обробці",
  PURCHASED = "куплено"
}

@Entity()
export class GoodsForSale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "decimal", width: 20.2 })
  market_price: number;

  @Column({ type: "json", nullable: true })
  characteristics: string;

  @Column({ type: "enum", enum: State })
  state: State;

  @Column({ type: "varchar", length: 200 })
  picture: string;

  @Column({ type: "varchar", length: 1200, nullable: true })
  description: string;

  @Column({ type: "enum", enum: Category })
  category: Category;

  @Column({ type: "int", nullable: true })
  views: number;

  @Column({ type: "date", default: "2023-11-19" })
  end_date: string;

  @Column({ type: "enum", enum: Status, default: "очікує" })
  status: Status

  @OneToMany(() => Bids, (bids) => bids.goodsForSaleId)
  bids: Bids[]
}

