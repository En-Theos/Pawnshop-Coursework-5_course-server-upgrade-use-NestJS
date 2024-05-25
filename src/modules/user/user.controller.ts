import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {

    

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
