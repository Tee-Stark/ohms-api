import express from 'express';
import { GetAllApplications, GetApplication, SearchUserApplication, SubmitApplication, UpdateApplicationStatus } from "../controllers/application.controller.js";
import { requireAdmin, requireAuth } from '../middlewares/auth.middleware.js';

const applicationRouter = express.Router();

applicationRouter.post('/create', requireAuth, SubmitApplication);
applicationRouter.get('/search', requireAuth, SearchUserApplication);
applicationRouter.get('/', [requireAuth, requireAdmin], GetAllApplications);
applicationRouter.get('/:id', requireAuth, GetApplication);
applicationRouter.get('/:id/review', [requireAuth, requireAdmin], UpdateApplicationStatus);


export default applicationRouter;
