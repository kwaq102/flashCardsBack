import { Router } from "express";
import { WordRecord } from "../records/words.record";
import { ValidationError } from "../utils/errors";

export const wordRouter = Router()

    .get('/search/:id', async (req, res) => {
        const wordsList = await WordRecord.listAll(req.params.id);
        res.json(wordsList)
    })

    .delete('/data/remove/:id', async (req, res) => {
        const word = await WordRecord.getOne(req.params.id);
        await word.delete();
        console.log('usunięto ')
        res.end();
    })

    .post('/add/:id', async (req, res) => {
        const userId = req.params.id;

        const obj = {
            ...req.body,
        }

        const word = new WordRecord(obj as WordRecord);
        await word.addWord(userId);

        res.end();
    })

    .patch('/search/:id', async (req, res) => {
        const { body } = req;

        const word = await WordRecord.getOne(body.id);

        if (!word) {
            throw new ValidationError('Słowo nie zostało znalezione.')
        }

        word.title = body.title;
        word.description = body.description;
        word.notes = body.notes;

        await word.update(body.id)

        console.log('Edytowano')

        res.json(word)
    })