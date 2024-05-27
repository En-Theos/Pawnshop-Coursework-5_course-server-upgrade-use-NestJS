import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    name: string;

    @Column({ type: "text" })
    email: string;

    @Column({ type: "text" })
    password: string;

    @Column({ type: "boolean" })
    isActivated: boolean;

    @Column({ type: "text" })
    activationLink: string;

    @Column({ type: "text" })
    refresh_token: string;
    
}