import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsForSale } from './entity/goods-for-sale.entity';
import { GoodsService } from './goods.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([GoodsForSale]),
    ],
    providers: [GoodsService],
    exports: [GoodsService]
})
export class GoodsModule { }
