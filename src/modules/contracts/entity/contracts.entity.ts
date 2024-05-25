import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { ContractsInfoBorrower } from "./contracts-info-borrower.entity";
import { ContractsInfoSubject } from "./contracts-info-subject.entity";

export enum Category {
    TECHNIQUE = "Техніка",
    SILVER_JEWELRY = "Дорогоцінності із срібла",
    GOLD_JEWELRY = "Дорогоцінності із золота",
    ANTIQUES = "Антикваріат",
    WRISTWATCH = "Наручні годинники"
}

@Entity()
export class Contracts {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ContractsInfoBorrower, (contractsInfoBorrower) => contractsInfoBorrower.contracts)
    @JoinColumn({ name: "id_borrower" })
    contractsInfoBorrowerId: ContractsInfoBorrower;

    @OneToOne(() => ContractsInfoSubject)
    @JoinColumn({ name: "id_subject " })
    contractsInfoSubjectId: ContractsInfoSubject

    @Column({ type: "varchar", length: 255 })
    pawnbroker_name: string;

    @Column({ type: "varchar", length: 255 })
    pawnbroker_address: string;

    @Column({ type: "varchar", length: 255 })
    borrower_name: string;

    @Column({ type: "varchar", length: 255 })
    borrower_address: string;

    @Column({ type: "int" })
    loan_amount: number;

    @Column({ type: "decimal", width: 5.3 })
    monthly_interest_rate: number;

    @Column({ type: "int" })
    repayment_period_months: number;

    @Column({ type: "varchar", length: 255 })
    name_subject: string;

    @Column({ type: "int" })
    amount_of_payment: number;

    @Column({ type: "varchar", length: 255 })
    terms_of_violation: string;

    @Column({ type: "date" })
    date_conclusion_contract: string;

    @Column({ type: "enum", enum: Category })
    category: Category

}