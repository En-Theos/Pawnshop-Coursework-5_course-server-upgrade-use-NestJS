import { Body, Controller, Post } from '@nestjs/common';
import { LeafDto } from './dto/leaf.dto';

@Controller('leaf')
export class LeafController {

    @Post("leaf")
    async addLeaf(@Body() dto: LeafDto) {

    }

}
