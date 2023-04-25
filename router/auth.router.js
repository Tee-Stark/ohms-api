import express from 'express';
import { Login, SignUp } from '../controllers/auth.controller.js';
import { ValidateUser } from '../validations/user.validation.js';

const authRouter = express.Router();

authRouter.post('/signup', ValidateUser, SignUp)
authRouter.post('/login', ValidateUser, Login);

export default authRouter;
