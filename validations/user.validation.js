import asyncHandler from "../handlers/asyncHandler.js";
import userSchema from "./schema/user.schema.js";

export const ValidateUser = asyncHandler(async (req, res, next) => {
    const valid = await userSchema.validateAsync(req.body);
    return next();
})

