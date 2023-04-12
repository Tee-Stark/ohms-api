import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';

const app = new express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

export default app;
