import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;
export const MONGO_URI = process.env.MONGO_URI
export const JWT_EXP = process.env.JWT_EXP
export const JWT_SECRET = process.env.JWT_SECRET
export const APPROVED_STATUS = 'approved'
export const REJECTED_STATUS = 'rejected'
export const PENDING_STATUS = 'pending'
export const APPLICATION_PENDING_NOTE = 'reviewing'
export const APPLICATION_APPROVED_NOTE = 'approved'
export const APPLICATION_REJECTED_NOTE = 'rejected'
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET
export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME
export const LAGMOBILE_FOLDER = 'lagmobileUrls'
export const WAPIC_FOLDER = 'wapicUrls'
export const LETTER_FOLDER = 'letterUrls'
export const HOSTEL_PAYSLIP_FOLDER = 'hostelPaySlipUrls'
