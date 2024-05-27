import { Injectable } from "@nestjs/common";
import { RegistrationDto } from "../auth/dto/registration";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./entity/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private readonly users: Repository<Users>
    ) { }

    findUser(dto: Partial<Users>): Promise<Users> {
        return this.users.findOneBy(dto)
    }

    async createUser(dto: Pick<Users, "name" | "email" | "password" | "activationLink">): Promise<Pick<Users, "id" | "name" | "email" | "isActivated">> {
        const newUser = await this.users.save(dto);

        return {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isActivated: newUser.isActivated
        }
    }

    async updateUser(where: Partial<Users>, dto: Partial<Omit<Users, "id">>): Promise<boolean> {
        const updateResult = await this.users.update(where, dto);

        return !!updateResult.affected
    }
}