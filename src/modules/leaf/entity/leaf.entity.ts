import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Leaf {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    name: string;

    @Column({ type: "text" })
    email: string;

    @Column({ type: "text" })
    phone: string;

    @Column({ type: "mediumtext" })
    message: string;

}