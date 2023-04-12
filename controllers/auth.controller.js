import auth from "../services/auth.service.js";
import asyncHandler from "../handlers/asyncHandler.js";
import { generateAccessToken } from "../helpers/token.js";
import { USER } from "../config/constants.config.js";
import { handleResponse } from "../handlers/responseHandler.js";

export const SignUp = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return handleResponse(res, 400);
    }

    let createdUser = await auth.CreateUser({ email, password });
    if (!createdUser) {
        return handleResponse(res, 500);
    }

    createdUser.password = undefined;
    return handleResponse(res, 201, createdUser);
})

export const Login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return handleResponse(res, 400);
    }

    let loginUser = await auth.LoginUser(email, password);
    if(!loginUser) {
        return handleResponse(res, 400, { error: "invalid login credentials" });
    }
    loginUser = loginUser.toObject();
    loginUser.password = undefined;
    loginUser.token = generateAccessToken(loginUser._id, USER);
    return handleResponse(res, 200, loginUser);
})
