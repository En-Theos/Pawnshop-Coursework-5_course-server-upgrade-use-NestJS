import { GoodsForSale } from "src/modules/goods/entity/goods-for-sale.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PurchaseOrders {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    name_customer: string;

    @Column({ type: "text" })
    email: string;

    @ManyToOne(() => GoodsForSale, (goodsForSale) => goodsForSale.id)
    @JoinColumn({ name: "id_product" })
    id_product: number;

}