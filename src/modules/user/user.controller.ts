import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddLeafDto } from './dto/add-leaf.dto';

@Controller('user')
export class UserController {

    @Post("add_leaf")
    async addLeaf(@Body() dto: AddLeafDto) {

    }

    @Get("bids")
    async getBids() {

    }

    @Get("orders")
    async getOrders() {
        
    }

    @Get("evaluation")
    async getEvaluation() {
        
    }

}
