import { IsString } from "class-validator";

export class RegistrationDto {
    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    password: string;
}