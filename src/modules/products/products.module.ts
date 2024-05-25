import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrders } from './entity/purchase-orders.entuty';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PurchaseOrders
        ])
    ]
})
export class ProductsModule { }
