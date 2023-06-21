import asyncHandler from "../handlers/asyncHandler.js";
import complaintSchema from "./schema/complaint.schema.js";

export const ValidateComplaint = asyncHandler(async (req, res, next) => {
    const valid = await complaintSchema.validateAsync(req.body);
    return next();
})
