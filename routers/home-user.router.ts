import { Router } from "express";
import { UserRecord } from "../records/user.record";
import { ValidationError } from "../utils/errors";
import { compare } from "bcrypt";

export const homeRouter = Router()
    .get('/', async (req, res) => {
        res.send('witaj na stronie głównej')
    })

    .patch('/user/:id', async (req, res) => {
        const user = await UserRecord.getOneUser(req.params.id)

        if (!user) {
            throw new ValidationError('Użytkownik nie został odnaleziony.')
        }

        await compare(req.body.oldPassword, user.password, (err, result) => {
            if (result) {
                user.updateUserPassword(req.params.id, req.body.newPassword)

                console.log('Hasło zostało zmienione')
                res.json({ "error": false })
                res.end();
            } else {
                new ValidationError('Stare haslo jest nieprawidłowe')
                res.json({ "error": true })
                res.end();
            }
        })
    })