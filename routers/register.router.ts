import { Router } from "express";
import { RegisterRecord } from "../records/register.record";
import { ValidationError } from "../utils/errors";

export const registerRouter = Router()
    .post('/', async (req, res) => {
        const data = {
            ...req.body,
        };

        const allUsers = await RegisterRecord.listAllUsers();
        const newUser = new RegisterRecord(data);

        if (!newUser.name || newUser.name.length < 3 || newUser.name.length > 99) {
            throw new ValidationError('Nazwa użytkownika powinna skłądać się z co najmniej 3 znaków i maksymalnie z 99.')
        }
        if (
            newUser.email.length < 5 ||
            !newUser.email.includes("@") ||
            !newUser.email.includes(".")
        ) {
            throw new ValidationError('Nieprawidłowy email');
        }
        if (allUsers.some(user => user.email === newUser.email)) {
            throw new ValidationError("Email już istnieje!")
        }

        if (newUser.password.length < 5) {
            throw new ValidationError('Hasło jest zbyk krókie.');
        }

        await newUser.insertUser();
        res.json(newUser);
    })
    .get('/users', async (req, res) => {
        const userList = await RegisterRecord.listAllUsers();
        res.json({ userList })
    })