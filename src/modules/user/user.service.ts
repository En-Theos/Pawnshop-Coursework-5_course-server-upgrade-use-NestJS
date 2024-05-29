import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./entity/users.entity";
import { Repository } from "typeorm";
import { BidsService } from "../lots/bids.service";
import { OrdersService } from "../products/orders.service";
import { EvaluationService } from "../evaluation/evaluation.service";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,

        private readonly bidsService: BidsService,
        private readonly ordersService: OrdersService,
        private readonly evaluationService: EvaluationService
    ) { }

    findUser(where: Partial<Users>): Promise<Users> {
        return this.usersRepository.findOneBy(where)
    }

    async createUser(dto: Pick<Users, "name" | "email" | "password" | "activationLink">): Promise<Pick<Users, "id" | "name" | "email" | "isActivated">> {
        const newUser = await this.usersRepository.save(dto);

        return {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isActivated: newUser.isActivated
        }
    }

    async updateUser(where: Partial<Users>, dto: Partial<Omit<Users, "id">>): Promise<boolean> {
        const updateResult = await this.usersRepository.update(where, dto);

        return !!updateResult.affected
    }

    getUserBids(dto: Pick<Users, "email">) {
        return this.bidsService.getAllBy(dto)
    }

    getUserOrders(dto: Pick<Users, "email">) {
        return this.ordersService.getAllBy(dto)
    }

    getUserEvaluation(dto: Pick<Users, "email">) {
        return this.evaluationService.getAllRequestBy(dto)
    }
}