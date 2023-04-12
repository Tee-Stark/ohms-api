import userModel from "../models/user.model.js";

const GetUserByEmail = async (email) => {
   try {
    const user = await userModel.findOne({ $where: { email: email }}).lean();
    return user;
   } catch (error) {
    throw new Error(error);
   }
}

const GetUserByID =  async (userId) => {
    try {
        const user = await userModel.findById(userId).lean();
        return user;
    } catch (error) {
        throw new Error(error);
    }
}

export {
    GetUserByEmail,
    GetUserByID
}
