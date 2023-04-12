import { Router } from "express";
import { WordRecord } from "../records/words.record";

export const homeRouter = Router()
    .get('/', async (req, res) => {

        res.send('witaj na strinie głównej')

    })
    .get('/test', async (req, res) => {

        res.send('podstrona z testami')

    })
    .get('/data/search/:id', async (req, res) => {
        const wordsList = await WordRecord.listAll(req.params.id);
        res.json(wordsList)
    })

    .delete('/data/remove/:id', async (req, res) => {
        const word = await WordRecord.getOne(req.params.id);

        console.log(word);

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