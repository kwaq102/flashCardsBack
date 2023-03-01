import express, { json } from 'express';

import cors from 'cors';
import 'express-async-errors';
import { homeRouter } from './routers/home.router';
import { registerRouter } from './routers/register.router';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(json());

app.use('/', homeRouter);
app.use('/register', registerRouter);

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