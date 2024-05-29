import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrders } from './entity/purchase-orders.entuty';
import { ProductsService } from './products.service';
import { GoodsModule } from '../goods/goods.module';
import { ProductsController } from './products.controller';
import { OrdersService } from './orders.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PurchaseOrders
        ]),
        GoodsModule
    ],
    controllers: [ProductsController],
    providers: [ProductsService, OrdersService],
    exports: [OrdersService]
})
export class ProductsModule { }
