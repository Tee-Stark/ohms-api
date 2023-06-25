import User from "../models/user.model.js";
import userService from "./user.service.js";
import { AppError } from "../error/AppError.js";

const CreateUser = async (user) => {
    try {
        let newUser = await User.create(user);
        let userRoom = newUser.role === 'user' ? newUser.room.roomNumber : undefined;
        newUser._doc.room = userRoom;
        return newUser;
    } catch (error) {
        throw new AppError(error);
    }
}

const LoginUser = async (email, password) => {
    const user = await userService.GetUserByEmail(email);
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
