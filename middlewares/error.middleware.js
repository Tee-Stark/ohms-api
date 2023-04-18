import { AppError } from '../error/AppError.js';
import { handleResponse } from '../handlers/responseHandler.js';

export const handleError = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    console.error(err);

    if (err.message.includes('E11000')) {
      return handleResponse(res, 400, { error: "User already exists..."})
    }

    return handleResponse(res, err.statusCode, { error: err.message });
  }

  const { statusCode, message } = err;
  return handleResponse(res, statusCode, { error: message });
}
