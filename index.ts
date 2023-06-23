import express, { json } from 'express';

import cors from 'cors';
import 'express-async-errors';
import { homeRouter } from './routers/home-user.router';
import { registerRouter } from './routers/register.router';
import { loginRouter } from './routers/login.router';
import { wordRouter } from './routers/word.router';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(json());

app.use('/', homeRouter);
app.use('/data', wordRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port https://localhost:3001');
})