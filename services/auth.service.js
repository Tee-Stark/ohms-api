import User from "../models/user.model.js";
import { GetUserByEmail } from "./user.service.js";
import { AppError } from "../error/AppError.js";

const CreateUser = async (user) => {
    try {
        const newUser = await User.create(user);
        return newUser;
    } catch (error) {
        throw new AppError(error);
    }
}

const LoginUser = async (email, password) => {
    const user = await GetUserByEmail(email);
    if (!user) {
        return null;
    }
    const isPasswordCorrect = user.comparePassword(password);
    if (!isPasswordCorrect) {
        return null;
    }
    return user;
}

export default {
    CreateUser,
    LoginUser
}
