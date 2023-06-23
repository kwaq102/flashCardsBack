import { Router } from "express";
import { UserRecord } from "../records/user.record";
import { ValidationError } from "../utils/errors";
import { compare } from "bcrypt";

export const homeRouter = Router()
    .get('/', async (req, res) => {
        res.send('witaj na stronie głównej')
    })

    .patch('/user/:id', async (req, res) => {
        console.log(req.body)

        const user = await UserRecord.getOneUser(req.params.id)

        if (!user) {
            throw new ValidationError('Użytkownik nie został odnaleziony.')
        }

        await compare(req.body.oldPassword, user.password, (err, result) => {
            if (result) {

                user.updateUserPassword(req.params.id, req.body.newPassword)

                console.log('Hasło zostało zmienione')
                res.end();

            } else {
                console.log('err')
                res.end();
                // res.json({ "error": true })
            }
        })



    })