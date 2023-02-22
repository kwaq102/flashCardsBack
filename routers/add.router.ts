import { Router } from "express";

export const addRouter = Router().get('/add', async (req, res) => {
    // res.send('Działa addRouter');

    res.json({ "name": "Kamil" })
})