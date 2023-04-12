import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import { GetUserByEmail } from "./user.service.js";

const CreateUser = async (user) => {
    try {
        if(user.password) {
            const hash = await bcrypt.hash(user.password, 12);
            user.password = hash;
        }
        const newUser = await userModel.create(user);
        return newUser;
    } catch (error) {
        throw new Error(error);
    }
}

const LoginUser = async (email, password) => {
    const user = await GetUserByEmail(email);
    const passwordTrue = await bcrypt.compare(password, user.password)
}

export default {
    CreateUser,
    LoginUser
}
