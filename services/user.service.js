import { AppError } from "../error/AppError.js";
import User from "../models/user.model.js";

const GetUserByEmail = async (email) => {
   try {
    const user = await User.findOne({ email });
    return user;
   } catch (error) {
    throw new AppError(error, 404)
   }
}

const GetUserByID =  async (userId) => {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        throw new AppError(error, 404)
    }
}

const GetUserByApplication = async (applicationId) => {
    try {
        // find id in application
        const user = await User.findOne({ application: { $in: [applicationId] }}).lean();
        return user;
    } catch (error) {
        throw new AppError(error, 404)
    }
}
export {
    GetUserByEmail,
    GetUserByID,
    GetUserByApplication
}
