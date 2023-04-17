import express from 'express';
import { SubmitApplication } from "../controllers/application.controller.js";

const applicationRouter = express.Router();

applicationRouter.post('/create', SubmitApplication);

export default applicationRouter;
