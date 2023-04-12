import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import appRouter from './router/index.js';
import { handleError } from './middlewares/error.middleware.js';

const app = new express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.use(appRouter)
app.use(handleError)

export default app;
