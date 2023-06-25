import express from 'express';
import authRouter from './auth.router.js';
import indexRouter from './index.router.js';
import applicationRouter from './application.router.js';
import complaintRouter from './complaint.router.js';
import roomRouter from './room.router.js';
import userRouter from './user.router.js';
import uploadRouter from './uploads.router.js';

const appRouter = express.Router();

appRouter.get('/', (_req, res) => {
  res.send('Hello World!');
});

appRouter.use('/', indexRouter);
appRouter.use('/auth', authRouter);
appRouter.use('/application', applicationRouter);
appRouter.use('/complaint', complaintRouter);
appRouter.use('/room', roomRouter);
appRouter.use('/user', userRouter);
appRouter.use('/upload', uploadRouter);

export default appRouter;
