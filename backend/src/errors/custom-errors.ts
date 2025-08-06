export abstract class AppError extends Error {
  abstract statusCode: number;
  abstract status: string;
  isOperational = true;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  statusCode = 400;
  status = 'error';

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class NotFoundError extends AppError {
  statusCode = 404;
  status = 'error';

  constructor(message: string = 'Resource not found') {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class ConflictError extends AppError {
  statusCode = 409;
  status = 'error';

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

export class UnauthorizedError extends AppError {
  statusCode = 401;
  status = 'error';

  constructor(message: string = 'Unauthorized') {
    super(message);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class DatabaseError extends AppError {
  statusCode = 500;
  status = 'error';

  constructor(message: string = 'Database operation failed') {
    super(message);
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}