import applicationService from "../services/application.service.js";
import userService from "../services/user.service.js";
import asyncHandler from "../handlers/asyncHandler.js";
import { handleResponse } from "../handlers/responseHandler.js";
import { connection } from "../config/db.config.js";
import { AppError } from "../error/AppError.js";
import roomService from "../services/room.service.js";
import { APPLICATION_APPROVED_NOTE, APPLICATION_REJECTED_NOTE, APPROVED_STATUS, REJECTED_STATUS } from "../config/constants.config.js";

export const SubmitApplication = asyncHandler(async (req, res) => {
    const { 
        firstname,
        lastname,
        othername,
        faculty,
        department,
        level,     
     } = req.body;

    const { id } = req.user;
     if(!firstname || !lastname || !othername || !faculty || !department || !level) {
        console.error('missing required params')
        return handleResponse(res, 400);
     }

    const user = await userService.GetUserByID(id);
    if(!user) {
        throw new AppError('User not found', 404);
    }
    let applicationData = req.body;
    applicationData.roomNumber = user.room;

    const session = await connection.startSession();
    let applicationCreated;
    try {
        await session.startTransaction();

        console.log('starting transaction...')
        applicationCreated = await applicationService.CreateApplication(applicationData, session);
        await userService.UpdateUser(id, { $push : { applications: applicationCreated._id }}, { session });
        console.log('Application created successfully...');

        await session.commitTransaction(); 
    } catch (error) {
        await session.abortTransaction();
        throw new AppError(error, 500);
    } finally {
        await session.endSession();
    }

     if(!applicationCreated) {
        console.error('Couldnt create application successfully');
        return handleResponse(res, 500);
     }
     console.log('New application submitted successfully...');
     return handleResponse(res, 201, applicationCreated);
});

export const GetApplication = asyncHandler(async (req, res) => {
    const applicationId = req.params.id;
    const { role } = req.user;
    console.log('Getting application with id: ', applicationId);
    const applicationReturned = await applicationService.GetApplicationById(applicationId);

    if (!applicationReturned) {
        console.error('Could not return specific application')
        return handleResponse(res, 404);
    }

    if (role === 'user') {
        let respData = applicationReturned.slipGeneratable ? applicationReturned : applicationReturned.note;
        return handleResponse(res, 200, { respData });
    }
    return handleResponse(res, 200, applicationReturned);
});

export const GetAllApplications = asyncHandler(async (req, res) => {
    const applications = await applicationService.GetAllApplications();
    
    if (!applications) {
        console.error('Could not return applications')
        return handleResponse(res, 404);
    }

    return handleResponse(res, 200, applications);
})

export const UpdateApplicationStatus = asyncHandler(async (req, res) => {
    const applicationId = req.params.id;
    const newStatus = req.query.status;

    let applicationUpdated; // variable to hold updated application
    // update application status, and if application status is 'approved', update the resident count in the room, and add the user to the room
    if (newStatus === APPROVED_STATUS) {
        // get application details
        const application = await applicationService.GetApplicationById(applicationId);
        if (!application) {
            console.error('Could not find application');
            return handleResponse(res, 404);
        }
        
        const session = await connection.startSession();
        try {
            await session.startTransaction();
            console.log('Starting new DB transaction...');
            
            applicationUpdated = await applicationService.UpdateApplication(
                applicationId, 
                { status: newStatus, note: APPLICATION_APPROVED_NOTE, slipGeneratable: true },
                { session }
            );
            if (!applicationUpdated) {
                throw new AppError('Could not update application status', 500);
            }

            // get user by application
            const user = await userService.GetUserByApplication(applicationId);
            if (!user) {
                throw new AppError('Could not find user', 404);
            }
            // get user room and update it's properties
            const room = await roomService.GetRoom(user.room);
            if (!room) {
                throw new AppError('Could not find room', 404);
            }
            // update room resident count
            if (room.residentCount === Number(room.roomType)) {
                throw new AppError('Room is full', 400);
            } else {
                let newRoomStatus;
                if (room.residentCount + 1 === Number(room.roomType)) { 
                    newRoomStatus = 'occupied';
                } else {
                    newRoomStatus = room.roomStatus;
                }

                const roomUpdate = {
                    residentCount: room.residentCount + 1,
                    roomStatus: newRoomStatus,
                    $push: { residents: user._id }
                };
    
                const roomUpdated = await roomService.UpdateRoom(room._id, roomUpdate, { session });
                if (!roomUpdated) {
                    throw new AppError('Could not update room', 500);
                }
            }
            
            await session.commitTransaction();
        } catch (error) {
            console.error(error);
            await session.abortTransaction();
            return handleResponse(res, 500);
        } finally {
            console.log('Ending DB transaction...');
            session.endSession();
        }

    } else if (newStatus === REJECTED_STATUS) {
        // update application status
        applicationUpdated = await applicationService.UpdateApplication(applicationId, { status: newStatus, note: APPLICATION_REJECTED_NOTE, slipGeneratable: false });
        if (!applicationUpdated) {
            console.error('Update operation failed...');
            return handleResponse(res, 500);
        }
    }  else {
        throw new AppError('Invalid status', 400);
    } 

    if(!applicationUpdated) {
        console.error('Update operation failed...');
        return handleResponse(res, 500);
    }

    console.log(`Application: ${applicationUpdated._id} status updated to ${newStatus}`);
    console.log('Update application status operation successful...');
    return handleResponse(res, 200, { message: 'Updated application status successfully...'});
});

// search user application details
export const SearchUserApplication = asyncHandler(async (req, res) => {
        const { name, date } = req.query;

        let query = {};
        if (name) {
            query = {
                    $or: [
                    { firstname: { $regex: name, $options: 'i' } },
                    { lastname: { $regex: name, $options: 'i' } },
                    { othername: { $regex: name, $options: 'i' } }
                ]
            }
        }

        if (date) {
            let startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            let endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);
            query.createdAt = { $gte: startOfDay, $lte: endOfDay };
        }

        const applications = await applicationService.Search(query);

        if (!applications) {
            throw new AppError('Could not find applications', 404);
        }

        return handleResponse(res, 200, applications);
})

