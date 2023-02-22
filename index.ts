import express, { json } from 'express';

import cors from 'cors';
import 'express-async-errors';
import { addRouter } from './routers/add.router';

const app = express();


app.use('/add', (req, res) => {
    res.send('Działa addRouter')

})
app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port https://localhost:3001');
})