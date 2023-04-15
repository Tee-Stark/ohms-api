import { AppError } from '../error/AppError.js';
import { handleResponse } from '../handlers/responseHandler.js';

export const handleError = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    return handleResponse(res, err.statusCode, { error: err.message });
  }

  const { statusCode, message } = err;
  return handleResponse(res, statusCode, { error: message });
}
