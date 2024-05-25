import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PurchaseOrders {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    name_customer: string;

    @Column({ type: "text" })
    email: string;

    @Column({ type: "text" })
    name_product: string;

}