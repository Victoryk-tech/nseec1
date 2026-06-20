export const success = (res, message = "Success", data, statusCode = 200) =>
  res.status(statusCode).json({ success: true, message, ...(data !== undefined && { data }) });

export const created = (res, message = "Created", data, statusCode = 201) =>
  success(res, message, data, statusCode);

export const error = (res, message = "Something went wrong", statusCode = 500, errors = null) =>
  res.status(statusCode).json({ success: false, message, ...(errors && { errors }) });

export const notFound = (res, message = "Resource not found") => error(res, message, 404);

export const unauthorized = (res, message = "Unauthorized") => error(res, message, 401);

export const forbidden = (res, message = "Access denied") => error(res, message, 403);

export const badRequest = (res, message = "Bad request", errors = null) =>
  error(res, message, 400, errors);
