import { AppError } from '../error/AppError.js';
import Application from '../models/application.model.js';

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

// TODO: Get all applications

export default {
    CreateApplication,
    GetApplicationById
}
