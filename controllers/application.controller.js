import applicationService from "../services/application.service.js";
import asyncHandler from "../handlers/asyncHandler.js";
import { handleResponse } from "../handlers/responseHandler.js";

export const SubmitApplication = asyncHandler(async (req, res) => {
    const { 
        firstname,
        lastname,
        othername,
        faculty,
        department,
        level,
        cgpa,
        gender,
        hostel
     } = req.body;

     if(!firstname || !lastname || !othername || !faculty || !department || !level || !cgpa || !gender || !hostel) {
        return handleResponse(res, 400);
     }

     const applicationCreated = await applicationService.CreateApplication({
        firstname,
        lastname,
        othername,
        faculty,
        department,
        level,
        cgpa,
        gender,
        hostel
     });

     if(!applicationCreated) {
        console.error('Couldnt create application successfully');
        return handleResponse(res, 500);
     }
     console.log('New application submitted successfully...');
     return handleResponse(res, 201);
});

export const GetApplication = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const applicationReturned = await applicationService.GetApplicationById(id);

    if (!applicationReturned) {
        console.error('Could not return specific application')
        return handleResponse(res, 404);
    }

    return handleResponse(res, 200)
});

export const UpdateApplicationStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const newStatus = req.query.status;

    const applicationUpdated = await applicationService.UpdateApplication(id, { status: newStatus });

    if(!applicationUpdated) {
        console.error('Update operation failed...')
        return handleResponse(res, 500)
    }

    console.log('Update application status operation successful...')
    return handleResponse(res, 200, { message: 'Updated application status successfully...'})
});

// TODO: ReviewApplication(Change status), UploadApplicationDocuments.
