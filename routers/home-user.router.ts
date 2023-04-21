import { Router } from "express";
import { WordRecord } from "../records/words.record";
import { ValidationError } from "../utils/errors";

export const homeRouter = Router()
    .get('/', async (req, res) => {

        res.send('witaj na strinie głównej')

    })
    .get('/data/search/:id', async (req, res) => {
        const wordsList = await WordRecord.listAll(req.params.id);
        res.json(wordsList)
    })

    .delete('/data/remove/:id', async (req, res) => {
        const word = await WordRecord.getOne(req.params.id);
        await word.delete();
        console.log('usunięto ')
        res.end();
    })

    .post('/data/add/:id', async (req, res) => {
        const userId = req.params.id;

        const obj = {
            ...req.body,
        }

        console.log(obj)

        const word = new WordRecord(obj as WordRecord);
        await word.addWord(userId);

        console.log('dodano')
        res.end();
    })

    .patch('/data/search/:id', async (req, res) => {
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