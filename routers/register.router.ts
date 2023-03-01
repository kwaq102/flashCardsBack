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

        console.log(newUser);

        await newUser.insertUser();
        res.json(newUser);
    })
    // .get('/', async (req, res) => {

    //     res.send('rejesteracja')

    // })