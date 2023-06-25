import express from 'express';
import fileUpload from '../config/multer.config.js';
import { UploadHostelPaySlip, UploadLagmobile, UploadLetter, UploadWapic } from '../controllers/uploads.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';

const uploadRouter = express.Router();

uploadRouter.post('/letter', [fileUpload.single('file'), requireAuth], UploadLetter);
uploadRouter.post('/wapic', [fileUpload.single('file'), requireAuth], UploadWapic);
uploadRouter.post('/hostelSlip', [fileUpload.single('file'), requireAuth], UploadHostelPaySlip);
uploadRouter.post('/lagmobile', [fileUpload.single('file'), requireAuth], UploadLagmobile);

export default uploadRouter;
