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
})

// TODO: UpdateApplication, ReviewApplication(Change atatus), UploadApplicationDocuments.
