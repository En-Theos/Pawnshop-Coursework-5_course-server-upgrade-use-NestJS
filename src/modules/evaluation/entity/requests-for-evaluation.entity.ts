import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RequestsForEvaluation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    fullName: string;

    @Column({ type: "text" })
    email: string;

    @Column({ type: "text" })
    nameProduct: string;

    @Column({ type: "text" })
    state: string;

    @Column({ type: "text" })
    path: string;

    @Column({ type: "text" })
    type: string;

}