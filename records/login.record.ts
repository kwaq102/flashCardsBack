import { FieldPacket } from "mysql2";
import { LoginUserEntity, UserEntity } from "../types";
import { pool } from "../utils/db";

type UserRecordResults = [UserEntity[], FieldPacket[]]

export class LoginRecord implements LoginUserEntity {
    email: string;
    password: string;

    constructor(loginData: LoginRecord) {
        // TODO walidacja logownia!!!!

        this.email = loginData.email;
        this.password = loginData.password;
    }

    static async getOneUser(email: string): Promise<UserEntity | null> {
        const [results] = await pool.execute("SELECT * FROM `users` WHERE `email` = :email", { email }) as UserRecordResults;


        return results.length === 0 ? null : results[0]
    }
}