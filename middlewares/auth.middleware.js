import { AppError } from "../error/AppError.js";
import asyncHandler from "../handlers/asyncHandler.js";
import { handleResponse } from "../handlers/responseHandler.js";
import { decodeAccessToken } from "../helpers/token.js";

export const requireAuth = asyncHandler(async (req, _res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    throw new AppError("Unauthorized", 401)
  }
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer" || !token) {
    throw new AppError("Unauthenticated", 401)
  }

  const decoded = decodeAccessToken(token);
  if (!decoded) {
    throw new AppError("Unauthenticated", 401)
  }

  req.user = decoded;
  next();
})

export const requireAdmin = asyncHandler(async (req, res, next) => {
  const { role } = req.user;

  if(role  !== 'ADMIN') {
    console.log(`Someone @${req.user.id} tried something fishy...`);
    return handleResponse(res, 403);
  } else {
    return next();
  }
})
