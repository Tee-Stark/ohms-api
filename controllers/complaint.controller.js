// endpoints for user activties
import asyncHandler from "../handlers/asyncHandler.js";
import { handleResponse } from "../handlers/responseHandler.js";
import complaintServices from "../services/complaint.service.js";

export const SubmitComplaint = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    const complaint = await complaintServices.CreateComplaint({ title, description });
    if (!complaint) {
        console.error('Could not create new complaint...')
        return handleResponse(res, 500);
    }

    console.log('New complaint created successfully...')
    return handleResponse(res, 201, complaint)
})

export const GetAllComplaints = asyncHandler(async (req, res) => {
    const complaints = await complaintServices.GetComplaints();

    if(!complaints) {
        console.error('Unable to retrieve complaints from Database')
        return handleResponse(res, 500)
    }

    console.log('Complaints returned')
    return handleResponse(res, 200, complaints)
})

export const GetComplaintsByDate = asyncHandler(async (req, res) => {
    const { date } = req.query;
    const complaints = await complaintServices.GetComplaintsByDate(date);

    if(!complaints) {
        console.error('Unable to retrieve complaints from Database')
        return handleResponse(res, 500)
    }

    console.log('Complaints returned')
    return handleResponse(res, 200, complaints)
});
