import { Body, Controller, Post } from '@nestjs/common';
import { LeafDto } from './dto/leaf.dto';
import { LeafService } from './leaf.service';

@Controller('leaf')
export class LeafController {

    constructor(
        private readonly leafService: LeafService
    ) {}

    @Post()
    async addLeaf(@Body() dto: LeafDto) {
        return this.leafService.addLeaf(dto)
    }

}
