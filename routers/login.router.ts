import { Router } from "express";
import { LoginRecord } from "../records/login.record";
import { compare } from "bcrypt";

export const loginRouter = Router()
    .get('/', async (req, res) => {

        console.log(req.params);

    })
    .post('/:id', async (req, res) => {

        const user = await LoginRecord.getOneUser(req.params.id);

        console.log(req.body.password)
        console.log(user.password)


        const passFromFront = req.body.password;

        if (passFromFront === '') {
            res.json(user);
            return
        }


        compare(passFromFront, user.password, (err, result) => {
            if (result) {
                res.json(user);
            } else {
                console.log(err)
                res.json({ "error": true })
            }
        })
    })