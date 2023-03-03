import { Router } from "express";
import { WordRecord } from "../records/words.record";

export const homeRouter = Router()
    .get('/', async (req, res) => {

        res.send('witaj na strinie głównej')

    })
    .get('/test', async (req, res) => {

        res.send('podstrona z testami')

    })
    .get('/data/search', async (req, res) => {

        // res.send('POKAŻ WSZYSTKIE SŁOWA, z możliwością edytowania')

        const wordsList = await WordRecord.listAll();

        // console.log(wordsList);
        res.json(wordsList)



    })
    .get('/data/search/:id?', async (req, res) => {

        res.send('wyszukiwanie słówka')

    })
    .get('/add', async (req, res) => {

        res.send(`Dodwanie treści 
        
        Poniżej lub z boku może będzie widoczna tabela z słówkami
        
        ZMIENIĆ NA POST`);

    })