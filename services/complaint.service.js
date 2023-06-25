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

const GetComplaintsByDate = async (date) => {
    try {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const complaints = await Complaint.find({
            createdAt: { $gte: startOfDay, $lte: endOfDay }
        }).lean();

        return complaints;
    } catch (error) {
        throw new AppError(error, 500);
    }
};

export default {
    CreateComplaint,
    GetComplaint,
    GetComplaints,
    GetComplaintsByDate
}
