import { UserEntity } from "../types/user/user-entity";
import { pool } from "../utils/db";

export class RegisterRecord implements UserEntity {
    id?: string;
    name: string;
    email: string;
    password: string;

    constructor(userObj: RegisterRecord) {
        // TODO walidacja!

        this.id = userObj.id;
        this.name = userObj.name;
        this.email = userObj.email;
        this.password = userObj.password;
    }


    async insertUser(): Promise<void> {

        await pool.execute("INSERT INTO `users` VALUES(:id, :name, :email, :password)", {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
        })
    }
}