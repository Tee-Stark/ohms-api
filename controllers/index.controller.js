import asyncHandler from "../handlers/asyncHandler.js";
import { handleResponse } from "../handlers/responseHandler.js";

export const GetDashboard = asyncHandler(async (_req, res) => {
  return handleResponse(res, 200, { message: "You would see Dashboard stuffs here" })
});
