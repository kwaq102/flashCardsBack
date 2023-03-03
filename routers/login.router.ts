import { Router } from "express";
import { LoginRecord } from "../records/login.record";
import { RegisterRecord } from "../records/register.record";

export const loginRouter = Router()
    .get('/', async (req, res) => {

        console.log(req.body);


        // res.send('strona logowania')

    })
    .get('/:id', async (req, res) => {

        const user = await LoginRecord.getOneUser(req.params.id);

        res.json(user)

    })