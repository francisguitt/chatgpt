import express from 'express';
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: `${process.env.API_KEY}`,
});

const openai = new OpenAIApi(configuration);

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.send('Testando a Api');
});

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            max_tokens: 4000,
        });
        res.status(200).send({
            bot: response.data.choices[0].text
        });

    } catch (error) {
        console.log(error);
        res.status(500).send(error || 'Algo deu errado !');
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Running on port ${process.env.PORT}`);
});