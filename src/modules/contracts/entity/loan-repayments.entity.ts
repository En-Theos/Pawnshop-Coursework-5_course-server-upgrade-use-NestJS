import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ContractsInfoBorrower } from "./contracts-info-borrower.entity";
import { ContractsInfoSubject } from "./contracts-info-subject.entity";

export enum PaymentMethods {
    CASH = "Готівка",
    BANK_CARD = "Банківська карта",
    ELECTRONIC_PAYMENT = "Електрона оплата"
}

@Entity()
export class LoanRepayments {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ContractsInfoSubject, (contractsInfoSubject) => contractsInfoSubject.loanRepayments)
    @JoinColumn({ name: "subject_id" })
    contractsInfoSubjectId: ContractsInfoSubject

    @ManyToOne(() => ContractsInfoBorrower, (contractsInfoBorrower) => contractsInfoBorrower.loanRepayments)
    @JoinColumn({ name: "borrower_id" })
    contractsInfoBorrowerId: ContractsInfoBorrower;

    @Column({ type: "decimal", width: 10.2 })
    amount: number;

    @Column({ type: "date" })
    date: string;

    @Column({ type: "enum", enum: PaymentMethods })
    category: PaymentMethods

}