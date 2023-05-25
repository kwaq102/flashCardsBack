import { FieldPacket } from "mysql2";
import { UserEntity } from "../types/user/user-entity";
import { pool } from "../utils/db";
import { v4 as uuid } from 'uuid'
import { hash } from 'bcrypt';

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


        (async () => {
            hash(this.password, 10, (err, hash) => {
                if (err) {
                    throw new Error;
                }
                pool.execute("INSERT INTO `users` VALUES(:id, :userName, :email, :password)", {
                    id,
                    userName: this.userName,
                    email: this.email,
                    password: hash,
                })

            })
        })();
    }

    static async listAllUsers(): Promise<UserEntity[]> {
        const [results] = (await pool.execute("SELECT * FROM `users`")) as RegisterRecordResult;

        return results.map(obj => new RegisterRecord(obj))
    }
}