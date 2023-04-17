import { AppError } from '../error/AppError.js';
import Application from '../models/application.model.js';
import Complaint from '../models/complaint.model.js';

const CreateApplication = async (application) => {
    try {
        const newApplication = await Application.create(application);
        return newApplication;
    } catch (error) {
        throw new AppError(error, 500);
    }
}

const GetApplicationById = async (id) => {
    try {
        const application = await Application.findById(id).lean();
        return application;
    } catch (error) {
        throw new AppError(error, 404);
    }
}

const UpdateApplication = async (id, updates) => {
    try {
        const updatedApplication = await Application.findByIdAndUpdate(id, updates, {
            new: true
        });
        return updatedApplication;
    } catch (error) {
        throw new AppError(error, 404);
    }
}

const CreateComplaint = async (complaint) => {
    try {
        const newComplaint = await Complaint.create(complaint);
        return newComplaint;
    } catch (error) {
        throw new AppError(error, 500)
    }
}

// TODO: Get all applications

export default {
    CreateApplication,
    GetApplicationById,
    UpdateApplication
}
