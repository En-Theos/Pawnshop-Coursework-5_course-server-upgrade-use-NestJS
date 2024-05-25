import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BuyProductDto } from './dto/buy-product.dto';

@Controller('products')
export class ProductsController {

    @Get()
    async getAll() {

    }

    @Get(":id")
    async getOne(@Param("id") id: string) {

    }

    @Post("buy")
    async buy(@Body() dto: BuyProductDto) {
 
    }
} 
