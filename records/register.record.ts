import { FieldPacket } from "mysql2";
import { UserEntity } from "../types/user/user-entity";
import { pool } from "../utils/db";
import { v4 as uuid } from 'uuid'
import { ValidationError } from "../utils/errors";

type RegisterRecordResult = [RegisterRecord[], FieldPacket[]]


export class RegisterRecord implements UserEntity {
    id?: string;
    userName: string;
    email: string;
    password: string;

    constructor(userObj: RegisterRecord) {
        this.id = userObj.id;
        this.userName = userObj.userName;
        this.email = userObj.email;
        this.password = userObj.password;
    }

    async insertUser(): Promise<void> {
        const id = uuid();

        await pool.execute("INSERT INTO `users` VALUES(:id, :name, :email, :password)", {
            id,
            userName: this.userName,
            email: this.email,
            password: this.password,
        })
    }

    static async listAllUsers(): Promise<UserEntity[]> {
        const [results] = (await pool.execute("SELECT * FROM `users`")) as RegisterRecordResult;

        return results.map(obj => new RegisterRecord(obj))
    }
}