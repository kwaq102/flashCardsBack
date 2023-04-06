import { Router } from "express";
import { RegisterRecord } from "../records/register.record";

export const registerRouter = Router()
    .post('/', async (req, res) => {
        // console.log(...req.body);

        // res.send('strona rejestracji')
        const data = {
            ...req.body,
        };

        const newUser = new RegisterRecord(data);
        await newUser.insertUser();
        res.json(newUser);

    })