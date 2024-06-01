import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { State } from "./entity/state.entity";
import { RequestsForEvaluation } from "./entity/requests-for-evaluation.entity";
import { AddRequestDto } from "./dto/add-request.dto";

@Injectable()
export class EvaluationService {
    constructor(
        @InjectRepository(State)
        private readonly stateRepository: Repository<State>,

        @InjectRepository(RequestsForEvaluation)
        private readonly requestsForEvaluationRepository: Repository<RequestsForEvaluation>
    ) { }

    getState(): Promise<State[]> {
        return this.stateRepository.find();
    }

    addRequest({ images, dto }: {
        images: Array<Express.Multer.File>,
        dto: AddRequestDto
    }) {
        const names = images.map(file => {
            return file.path
        })

        this.requestsForEvaluationRepository.insert({
            ...dto,
            path: names.join(",")
        })

        return names
    }

    getAllRequestBy(where: Partial<RequestsForEvaluation>) {
        return this.requestsForEvaluationRepository.findBy(where)
    }
}