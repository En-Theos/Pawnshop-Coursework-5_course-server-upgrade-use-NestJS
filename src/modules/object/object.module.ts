import { Module } from '@nestjs/common';
import { LotsController } from './object-lots.controller';
import { ProductsController } from './object-products.controller';

@Module({
    controllers: [LotsController, ProductsController]
})
export class ObjectModule {}
