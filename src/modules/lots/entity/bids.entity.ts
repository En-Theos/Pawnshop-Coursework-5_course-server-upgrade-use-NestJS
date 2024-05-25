import { GoodsForSale } from "src/modules/goods/entity/goods-for-sale.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bids {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => GoodsForSale, (goodsForSale) => goodsForSale.bids)
    @JoinColumn({ name: "id_goods" })
    goodsForSaleId: GoodsForSale;

    @Column({ type: "decimal", width: 10.2 })
    rate: number;
    
    @Column({type: "varchar", length: 250})
    name: string;

    @Column({type: "varchar", length: 200})
    email: string;

}