import { Types } from 'mongoose';
import { AppError } from '../error/AppError.js';
import Application from '../models/application.model.js';

const CreateApplication = async (application, session) => {
    try {
        const newApplication = await Application.create([application], session);
        return newApplication[0];
    } catch (error) {
        throw new AppError(error, 500);
    }
}

const GetApplicationById = async (id) => {
    try {
        console.log('now in application func')
        const application = await Application.findById(id).lean();
        return application;
    } catch (error) {
        throw new AppError(error, 404);
    }
}

const GetAllApplications = async () => {
    try {
        const applications = await Application.find().lean();
        return applications;
    } catch (error) {
        throw new AppError(error, 404);
    }
}

// const FindByName = async (name) => {
//     try {
//         const regex = new RegExp(name, 'i');
//         const applicationFound = await Application.find({ firstname: regex }).lean();
//         return applicationFound[0];
//     } catch (error) {
//         throw new AppError(error, 404);
//     }
// }

const UpdateApplication = async (id, updates, options = {}) => {
    try {
        let session = options['session'] || undefined;
        const updatedApplication = await Application.findByIdAndUpdate(id, updates, {
            new: true,
            session: session
        });
        return updatedApplication;
    } catch (error) {
        throw new AppError(error, 404);
    }
}

const Search = async (query) => {
    try {
        const applications = await Application.find(query);
        return applications;
    } catch (error) {
        throw new AppError(error, 404);
    }
}

export default {
    CreateApplication,
    GetApplicationById,
    GetAllApplications,
    // FindByName
    UpdateApplication,
    Search
}
