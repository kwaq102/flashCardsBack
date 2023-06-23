import { FieldPacket } from "mysql2";
import { pool } from "../utils/db";
import { hash } from "bcrypt";


type UserRecordResult = [UserRecord[], FieldPacket[]]


export class UserRecord {
    id?: string;
    password: string;

    constructor(userObj: UserRecord) {
        this.id = userObj.id;
        this.password = userObj.password;
    }

    static async getOneUser(id: string): Promise<UserRecord> {
        const [result] = (await pool.execute("SELECT * FROM `users` WHERE `id` = :id", {
            id
        })) as UserRecordResult;

        return result.length === 0 ? null : new UserRecord(result[0])
    }

    async updateUserPassword(id: string, password: string): Promise<void> {

        hash(password, 10, (err, hash) => {
            if (err) {
                throw new Error;
            }
            pool.execute("UPDATE `users` SET `password` = :password WHERE `id` = :id", {
                id,
                password: hash,
            })
        })
    }
}