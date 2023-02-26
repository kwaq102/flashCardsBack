import express, { json } from 'express';

import cors from 'cors';
import 'express-async-errors';
import { addRouter } from './routers/add.router';

const app = express();

app.use(json());

app.use('/', addRouter);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port https://localhost:3001');
})

/**
 const obj = {
    name: 'Name',
    email: 'xxx@xx.com',
    data: [
        {
            title: 'Tytuł',
            description: 'Jakiś opis'
        },
        {
            title: 'Tytuł',
            description: 'Jakiś opis'
        },
        {
            title: 'Tytuł',
            description: 'Jakiś opis'
        },
    ]
}

 */