import { Router } from "express";
import { RegisterRecord } from "../records/register.record";

export const registerRouter = Router()
    .post('/', async (req, res) => {
        const data = {
            ...req.body,
        };

        const newUser = new RegisterRecord(data);
        await newUser.insertUser();
        res.json(newUser);
    })
    .get('/users', async (req, res) => {

        const userList = await RegisterRecord.listAllUsers();
        console.log(userList)
        res.json({ userList })
    })