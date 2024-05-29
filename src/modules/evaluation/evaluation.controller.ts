import { Controller, Get, Post } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';

@Controller('evaluation')
export class EvaluationController {

    constructor (
        private readonly evaluationService: EvaluationService
    ) {}

    @Get("state")
    getState() {
        return this.evaluationService.getState()
    }

    @Post("request")
    async addRequest() {
        return this.evaluationService.addRequest()
    }
    
}
