import { AppError } from '../error/AppError.js';
import Complaint from '../models/complaint.model.js';

const CreateComplaint = async (complaint) => {
    try {
        const newComplaint = await Complaint.create(complaint);
        return newComplaint;
    } catch (error) {
        throw new AppError(error, 500)
    }
}

const GetComplaint = async (complaintId) => {
    try {
        const complaint = await Complaint.findById(complaintId).lean();
        return complaint;
    } catch (error) {
        throw new AppError(error, 500)
    }
}

const GetComplaints = async () => {
    try {
        const complaint = await Complaint.find().lean();
        return complaint;
    } catch (error) {
        throw new AppError(error, 500)
    }
}

export default {
    CreateComplaint,
    GetComplaint,
    GetComplaints
}
