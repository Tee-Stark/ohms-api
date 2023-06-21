import express from 'express';
import { requireAdmin, requireAuth } from '../middlewares/auth.middleware.js';
import { GetAllComplaints, SubmitComplaint } from '../controllers/complaint.controller.js';
import { ValidateComplaint } from '../validations/complaint.validation.js';

const complaintRouter =  express.Router();

complaintRouter.post('/', [ValidateComplaint, requireAuth], SubmitComplaint)
complaintRouter.get('/', [requireAuth, requireAdmin], GetAllComplaints)

export default complaintRouter;
