import { Users } from "src/modules/user/entity/users.entity";

export interface RegisterResponse {
    user: Pick<Users, "email" | "id" | "name" | "isActivated">;
    accessToken: string;
}