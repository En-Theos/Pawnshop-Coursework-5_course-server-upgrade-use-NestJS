import { Module } from '@nestjs/common';
import { ContractsController } from './contracts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contracts } from './entity/contracts.entity';
import { ContractsInfoSubject } from './entity/contracts-info-subject.entity';
import { ContractsInfoBorrower } from './entity/contracts-info-borrower.entity';
import { LoanRepayments } from './entity/loan-repayments.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Contracts,
      ContractsInfoSubject,
      ContractsInfoBorrower,
      LoanRepayments
    ])
  ],
  controllers: [ContractsController]
})
export class ContractsModule { }
