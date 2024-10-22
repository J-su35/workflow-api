import { Role } from "src/users/entities/user.entity";

export class LoggedInDto {
    id: number;
    username: string
    // role: string;
    role: Role;
    sub?: number; //get jwt token
}