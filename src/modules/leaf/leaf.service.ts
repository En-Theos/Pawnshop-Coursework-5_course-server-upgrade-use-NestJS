import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Leaf } from "./entity/leaf.entity";
import { LeafDto } from "./dto/leaf.dto";


@Injectable()
export class LeafService {
    constructor(
        @InjectRepository(Leaf)
        private readonly leafRepository: Repository<Leaf>
    ) {}

    async addLeaf(dto: LeafDto): Promise<boolean> {
        await this.leafRepository.insert(dto);
        
        return true
    }
}