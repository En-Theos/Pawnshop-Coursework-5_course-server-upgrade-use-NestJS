import { Module } from '@nestjs/common';
import { PricesController } from './evaluation-prices.controller';
import { EvaluationController } from './evaluation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PricesService } from './prices.service';

import { prices } from "./entity/prices"
import { State } from './entity/state.entity';
import { RequestsForEvaluation } from './entity/requests-for-evaluation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ...prices,
      State,
      RequestsForEvaluation
    ])
  ],
  controllers: [
    PricesController,
    EvaluationController
  ],
  providers: [PricesService]
})
export class PricesModule { }
