import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class State {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 50 })
    state: string;

    @Column({ type: "float" })
    coefficient: number;

    @Column({ type: "varchar", length: 500 })
    description: string;

}