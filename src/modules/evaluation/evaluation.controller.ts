import { Body, Controller, Get, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as uuid from "uuid"
import { AddRequestDto } from './dto/add-request.dto';

@Controller('evaluation')
export class EvaluationController {

    constructor(
        private readonly evaluationService: EvaluationService
    ) { }

    @Get("state")
    getState() {
        return this.evaluationService.getState()
    }

    @Post("request")
    @UseInterceptors(FilesInterceptor('images', 2, {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                cb(null, `${uuid.v4()}${extname(file.originalname)}`)
            }
        })
    }))
    async addRequest(@UploadedFiles() images: Array<Express.Multer.File>, @Body() dto: AddRequestDto) {
        return this.evaluationService.addRequest({
            images, 
            dto
        })
    }

}
