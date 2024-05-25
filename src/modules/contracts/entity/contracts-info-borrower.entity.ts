import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Contracts } from "./contracts.entity";
import { LoanRepayments } from "./loan-repayments.entity";

@Entity()
export class ContractsInfoBorrower {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Contracts, (contracts) => contracts.contractsInfoBorrowerId)
    contracts: Contracts[];

    @OneToMany(() => LoanRepayments, (loanRepayments) => loanRepayments.contractsInfoBorrowerId)
    loanRepayments: LoanRepayments[];

    @Column({ type: "varchar", length: 50 })
    first_name: string;

    @Column({ type: "varchar", length: 50 })
    last_name: string;

    @Column({ type: "varchar", length: 50 })
    middle_name: string;

    @Column({ type: "varchar", length: 20 })
    phone_number: string;

    @Column({ type: "varchar", length: 50, nullable: true })
    email: string;

    @Column({ type: "varchar", length: 50 })
    personal_account_code: string;

    @Column({ type: "int" })
    age: number;

    @Column({ type: "int" })
    salary: number;

    @Column({ type: "varchar", length: 200 })
    address: string;
}