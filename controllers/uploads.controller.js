import {
     LAGMOBILE_FOLDER,
     WAPIC_FOLDER,
     LETTER_FOLDER,
     HOSTEL_PAYSLIP_FOLDER
  } from '../config/constants.config.js';
import asyncHandler from '../handlers/asyncHandler.js';
import fs from 'fs';
import { handleResponse } from '../handlers/responseHandler.js';
import { uploadFile } from '../helpers/file.js';

export const UploadHostelPaySlip = asyncHandler(async (req, res) => {
    const { file, user } = req;
    const filePath = file.path;

    const urlObject = await uploadFile(filePath, HOSTEL_PAYSLIP_FOLDER);

    const hostelPaySlipUrl = urlObject.url;

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Failed to delete file...');
            throw AppError(err);
        }
        console.log('file deleted');
    });

    return handleResponse(res, 200, { hostelPaySlipUrl });
});

export const UploadLetter = asyncHandler(async (req, res) => {
    const { file, user } = req;
    const filePath = file.path;

    const urlObject = await uploadFile(filePath, LETTER_FOLDER);

    const letterUrl = urlObject.url;

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Failed to delete file...');
            throw AppError(err);
        }
        console.log('file deleted');
    });

    return handleResponse(res, 200, { letterUrl });
});

export const UploadWapic = asyncHandler(async (req, res) => {
    const { file, user } = req;
    const filePath = file.path;

    const urlObject = await uploadFile(filePath, WAPIC_FOLDER);

    const wapicUrl = urlObject.url;

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Failed to delete file...');
            throw AppError(err);
        }
        console.log('file deleted');
    });

    return handleResponse(res, 200, { wapicUrl });
});

export const UploadLagmobile = asyncHandler(async (req, res) => {
    const { file, user } = req;
    const filePath = file.path;

    const urlObject = await uploadFile(filePath, LAGMOBILE_FOLDER);

    const lagmobileUrl = urlObject.url;

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Failed to delete file...');
            throw AppError(err);
        }
        console.log('file deleted');
    });

    return handleResponse(res, 200, { lagmobileUrl });
});
