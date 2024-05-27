import { Users } from "src/modules/user/entity/users.entity";

export interface LoginResponse {
    user: Pick<Users, "email" | "id" | "name" | "isActivated">;
    accessToken: string;
}