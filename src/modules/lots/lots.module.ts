import { Module } from '@nestjs/common';
import { LotsController } from './lots.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bids } from './entity/bids.entity';
import { GoodsModule } from '../goods/goods.module';
import { LotsService } from './lots.service';
import { BidsService } from './bids.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Bids]),
        GoodsModule
    ],
    controllers: [LotsController],
    providers: [LotsService, BidsService],
    exports: [BidsService]
})
export class LotsModule { }
