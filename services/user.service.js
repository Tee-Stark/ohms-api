import { AppError } from "../error/AppError.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

const { Types } = mongoose;

const GetUserByEmail = async (email) => {
   try {
    let user = await User.findOne({ email });
    const userRoom = user.role === 'user' ? user.room.roomNumber : undefined;
    user._doc.room = userRoom;
    user._doc.applications = undefined;
    return user;
   } catch (error) {
    throw new AppError(error, 404)
   }
}

const GetUserByID =  async (userId) => {
    try {
        let user = await User.findById(userId);
        const userRoom = user.room.roomNumber;
        user._doc.room = userRoom;
        return user;
    } catch (error) {
        throw new AppError(error, 404)
    }
}

const GetUserByApplication = async (applicationId) => {
    try {
        // find id in application
        const id = new Types.ObjectId(applicationId)
        const user = await User.findOne({ applications: { $in: [id] }});
        return user;
    } catch (error) {
        console.log(error)
        throw new AppError(error, 404)
    }
}

const UpdateUser = async (userId, update, options) => {
    try {
        const updated = await User.findByIdAndUpdate(userId, update, {
            new: true,
            session: options.session ? options.session : undefined
        });
    } catch (error) {
        throw new AppError(error, 500)
    }
}
export default {
    GetUserByEmail,
    GetUserByID,
    GetUserByApplication,
    UpdateUser
}
