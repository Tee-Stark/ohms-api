import express from 'express';
import { GetApplication, SearchUserApplication, SubmitApplication, UpdateApplicationStatus } from "../controllers/application.controller.js";
import { requireAdmin, requireAuth } from '../middlewares/auth.middleware.js';

const applicationRouter = express.Router();

applicationRouter.post('/create', requireAuth, SubmitApplication);
applicationRouter.get('/:id', requireAuth, GetApplication);
applicationRouter.get('/review', [requireAuth, requireAdmin], UpdateApplicationStatus);
applicationRouter.get('/search', requireAuth, SearchUserApplication);

export default applicationRouter;
