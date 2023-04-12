import express from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { GetDashboard } from '../controllers/index.controller.js';

const indexRouter = express.Router();

indexRouter.get('/dashboard', requireAuth, GetDashboard);

export default indexRouter;
