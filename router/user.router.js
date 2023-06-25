import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { GetUserByID, GetUserProfileByID } from "../controllers/user.controller.js";

const userRouter = express.Router();

// userRouter.get('/', [requireAuth], GetAllUsers);
userRouter.get('/:id', [requireAuth], GetUserByID);
userRouter.get('/:id/profile', [requireAuth], GetUserProfileByID);

export default userRouter;
