import { Controller, Get, Post } from '@nestjs/common';

@Controller('evaluation')
export class EvaluationController {

    @Get("state")
    async getState() {

    }

    @Post("request")
    async newRequest() {
        
    }
    
}
