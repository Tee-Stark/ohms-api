import asyncHandler from "../handlers/asyncHandler.js";
import { handleResponse } from "../handlers/responseHandler.js";
import userService from "../services/user.service.js";

export const GetUserByID = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await userService.GetUserByID(id);
    if(!user) {
        console.error('Unable to get user')
        throw new AppError('User not found', 404);
    }

    console.log('Successfully returned user...');
    return handleResponse(res, 200, user);
});

// export const GetAllUsers = asyncHandler(async (req, res) => {
//     const users = await userService.GetUsers();
//     if(!users) {
//         console.error('Unable to get users')
//         throw new AppError('Users not found', 404);
//     }

//     console.log('Successfully returned users...');
//     return handleResponse(res, 200, users);
// });

export const GetUserProfileByID = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await userService.GetUserByID(id);
    if(!user) {
        console.error('Unable to get user')
        throw new AppError('User not found', 404);
    }

    const latestApplicationIdx = user.applications.length - 1;
    const note = user.applications.length > 0 ? user.applications[latestApplicationIdx].note : 'No application';

    console.log('Successfully returned user...');
    return handleResponse(res, 200, { note });
});
