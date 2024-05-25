import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { LoanRepayments } from "./loan-repayments.entity";

export enum State {
    EXCELLENT = "Відмінний",
    GOOD = "Хороший",
    SATISFACTORY = "Задовільний",
    BAD = "Поганий",
    BROKEN = "Зламано"
}

@Entity()
export class ContractsInfoSubject {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => LoanRepayments, (loanRepayments) => loanRepayments.contractsInfoBorrowerId)
    loanRepayments: LoanRepayments[];

    @Column({ type: "varchar", length: 150 })
    name: string;

    @Column({ type: "varchar", length: 1500, nullable: true })
    description: string;

    @Column({ type: "json", nullable: true })
    characteristics: string;

    @Column({ type: "varchar", length: 100 })
    photo: string;

    @Column({ type: "enum", enum: State })
    category: State

}