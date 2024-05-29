import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BuyProductDto } from './dto/buy-product.dto';
import { ProductsService } from './products.service';
import { GoodsForSale } from '../goods/entity/goods-for-sale.entity';
import { OrdersService } from './orders.service';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
        private readonly ordersService: OrdersService
    ) { }

    @Get()
    async getAll() {
        return this.productsService.getAll();
    }

    @Get(":id")
    async getOne(@Param() { id }: Pick<GoodsForSale, "id">) {
        return this.productsService.getOne({ id })
    }

    @Post("buy")
    async buy(@Body() dto: BuyProductDto) {
        return this.ordersService.buyProduct(dto);
    }
} 
