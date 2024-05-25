import { Module } from '@nestjs/common';
import { LotsController } from './lots.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bids } from './entity/bids.entity';
import { GoodsModule } from '../goods/goods.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Bids]),
        GoodsModule
    ],
    controllers: [LotsController]
})
export class LotsModule { }
