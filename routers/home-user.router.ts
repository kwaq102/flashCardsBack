import { Router } from "express";
import { WordRecord } from "../records/words.record";
import { v4 as uuid } from 'uuid'

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


    .post('/data/add/', async (req, res) => {
        // const userId = req.params.id;

        const obj = {
            ...req.body,
        }

        console.log(obj)

        const word = new WordRecord(obj as WordRecord);
        await word.addWord();

        console.log('dodano')
        res.end();
    })