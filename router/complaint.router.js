import express from 'express';
import { requireAdmin, requireAuth } from '../middlewares/auth.middleware.js';
import { GetAllComplaints, GetComplaintsByDate, SubmitComplaint } from '../controllers/complaint.controller.js';
import { ValidateComplaint } from '../validations/complaint.validation.js';

const complaintRouter =  express.Router();

complaintRouter.post('/', [ValidateComplaint, requireAuth], SubmitComplaint)
complaintRouter.get('/', [requireAuth, requireAdmin], GetAllComplaints)
complaintRouter.get('/filter', [requireAuth, requireAdmin], GetComplaintsByDate)

export default complaintRouter;
