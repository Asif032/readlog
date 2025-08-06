import { Request, Response, NextFunction } from 'express';
import { AppError, ValidationError, NotFoundError, ConflictError, UnauthorizedError, DatabaseError } from '../errors/custom-errors';

interface ErrorResponse {
  status: string;
  message: string;
  stack?: string;
  details?: any;
  timestamp: string;
  path: string;
}

export class GlobalExceptionHandler {
  
  // Main error handler - routes to specific handlers
  static handle(error: Error, req: Request, res: Response, next: NextFunction): Response {
    console.error('Error caught by global handler:', error);

    const timestamp = new Date().toISOString();
    const path = req.originalUrl;

    // Route to specific handler based on error type
    if (error instanceof ValidationError) {
      return this.handleValidationError(error, req, res, timestamp, path);
    }
    
    if (error instanceof NotFoundError) {
      return this.handleNotFoundError(error, req, res, timestamp, path);
    }
    
    if (error instanceof ConflictError) {
      return this.handleConflictError(error, req, res, timestamp, path);
    }
    
    if (error instanceof UnauthorizedError) {
      return this.handleUnauthorizedError(error, req, res, timestamp, path);
    }
    
    if (error instanceof DatabaseError) {
      return this.handleDatabaseError(error, req, res, timestamp, path);
    }
    
    if (error instanceof AppError) {
      return this.handleAppError(error, req, res, timestamp, path);
    }
    
    // Handle specific error names (for third-party libraries)
    if (error.name === 'NoResultError') {
      return this.handleKyselyNoResultError(error, req, res, timestamp, path);
    }
    
    if (error.name === 'JsonWebTokenError') {
      return this.handleJWTError(error, req, res, timestamp, path);
    }
    
    if (error.name === 'TokenExpiredError') {
      return this.handleTokenExpiredError(error, req, res, timestamp, path);
    }
    
    if (error instanceof SyntaxError && 'body' in error) {
      return this.handleSyntaxError(error, req, res, timestamp, path);
    }
    
    // Handle PostgreSQL errors
    if ('code' in error) {
      return this.handlePostgreSQLError(error as any, req, res, timestamp, path);
    }
    
    // Default handler for unhandled errors
    return this.handleInternalServerError(error, req, res, timestamp, path);
  }

  // @ExceptionHandler(ValidationError.class) equivalent
  private static handleValidationError(
    error: ValidationError, 
    req: Request, 
    res: Response, 
    timestamp: string, 
    path: string
  ): Response {
    const errorResponse: ErrorResponse = {
      status: 'error',
      message: error.message,
      timestamp,
      path,
    };

    if (process.env.NODE_ENV === 'development') {
      errorResponse.stack = error.stack;
    }

    return res.status(400).json(errorResponse);
  }

  // @ExceptionHandler(NotFoundError.class) equivalent
  private static handleNotFoundError(
    error: NotFoundError, 
    req: Request, 
    res: Response, 
    timestamp: string, 
    path: string
  ): Response {
    const errorResponse: ErrorResponse = {
      status: 'error',
      message: error.message,
      timestamp,
      path,
    };

    return res.status(404).json(errorResponse);
  }

  // @ExceptionHandler(ConflictError.class) equivalent
  private static handleConflictError(
    error: ConflictError, 
    req: Request, 
    res: Response, 
    timestamp: string, 
    path: string
  ): Response {
    const errorResponse: ErrorResponse = {
      status: 'error',
      message: error.message,
      timestamp,
      path,
    };

    return res.status(409).json(errorResponse);
  }

  // @ExceptionHandler(UnauthorizedError.class) equivalent
  private static handleUnauthorizedError(
    error: UnauthorizedError, 
    req: Request, 
    res: Response, 
    timestamp: string, 
    path: string
  ): Response {
    const errorResponse: ErrorResponse = {
      status: 'error',
      message: error.message,
      timestamp,
      path,
    };

    return res.status(401).json(errorResponse);
  }

  // @ExceptionHandler(DatabaseError.class) equivalent
  private static handleDatabaseError(
    error: DatabaseError, 
    req: Request, 
    res: Response, 
    timestamp: string, 
    path: string
  ): Response {
    const errorResponse: ErrorResponse = {
      status: 'error',
      message: process.env.NODE_ENV === 'production' 
        ? 'Database operation failed' 
        : error.message,
      timestamp,
      path,
    };

    if (process.env.NODE_ENV === 'development') {
      errorResponse.stack = error.stack;
    }

    return res.status(500).json(errorResponse);
  }

  // @ExceptionHandler(AppError.class) equivalent - Generic app error handler
  private static handleAppError(
    error: AppError, 
    req: Request, 
    res: Response, 
    timestamp: string, 
    path: string
  ): Response {
    const errorResponse: ErrorResponse = {
      status: error.status,
      message: error.message,
      timestamp,
      path,
    };

    if (process.env.NODE_ENV === 'development') {
      errorResponse.stack = error.stack;
    }

    return res.status(error.statusCode).json(errorResponse);
  }

  // Handle Kysely NoResultError
  private static handleKyselyNoResultError(
    error: Error, 
    req: Request, 
    res: Response, 
    timestamp: string, 
    path: string
  ): Response {
    const errorResponse: ErrorResponse = {
      status: 'error',
      message: 'Resource not found',
      timestamp,
      path,
    };

    return res.status(404).json(errorResponse);
  }

  // @ExceptionHandler(JsonWebTokenError.class) equivalent
  private static handleJWTError(
    error: Error, 
    req: Request, 
    res: Response, 
    timestamp: string, 
    path: string
  ): Response {
    const errorResponse: ErrorResponse = {
      status: 'error',
      message: 'Invalid authentication token',
      timestamp,
      path,
    };

    return res.status(401).json(errorResponse);
  }

  // Handle JWT token expired
  private static handleTokenExpiredError(
    error: Error, 
    req: Request, 
    res: Response, 
    timestamp: string, 
    path: string
  ): Response {
    const errorResponse: ErrorResponse = {
      status: 'error',
      message: 'Authentication token has expired',
      timestamp,
      path,
    };

    return res.status(401).json(errorResponse);
  }

  // Handle JSON syntax errors
  private static handleSyntaxError(
    error: SyntaxError, 
    req: Request, 
    res: Response, 
    timestamp: string, 
    path: string
  ): Response {
    const errorResponse: ErrorResponse = {
      status: 'error',
      message: 'Invalid JSON payload',
      timestamp,
      path,
    };

    return res.status(400).json(errorResponse);
  }

  // Handle PostgreSQL specific errors
  private static handlePostgreSQLError(
    error: any, 
    req: Request, 
    res: Response, 
    timestamp: string, 
    path: string
  ): Response {
    let statusCode = 500;
    let message = 'Database error';

    // PostgreSQL error codes
    switch (error.code) {
      case '23505': // Unique violation
        statusCode = 409;
        message = 'Resource already exists';
        break;
      case '23502': // Not null violation
        statusCode = 400;
        message = 'Required field is missing';
        break;
      case '23503': // Foreign key violation
        statusCode = 400;
        message = 'Referenced resource does not exist';
        break;
      case '42P01': // Table does not exist
        statusCode = 500;
        message = 'Database configuration error';
        break;
      default:
        message = process.env.NODE_ENV === 'production' 
          ? 'Database operation failed' 
          : error.message;
    }

    const errorResponse: ErrorResponse = {
      status: 'error',
      message,
      timestamp,
      path,
    };

    if (process.env.NODE_ENV === 'development') {
      errorResponse.stack = error.stack;
      errorResponse.details = {
        code: error.code,
        detail: error.detail,
        hint: error.hint,
      };
    }

    return res.status(statusCode).json(errorResponse);
  }

  // @ExceptionHandler(Exception.class) equivalent - Default handler
  private static handleInternalServerError(
    error: Error, 
    req: Request, 
    res: Response, 
    timestamp: string, 
    path: string
  ): Response {
    const errorResponse: ErrorResponse = {
      status: 'error',
      message: process.env.NODE_ENV === 'production' 
        ? 'Internal server error' 
        : error.message,
      timestamp,
      path,
    };

    if (process.env.NODE_ENV === 'development') {
      errorResponse.stack = error.stack;
    }

    return res.status(500).json(errorResponse);
  }
}

// Export the main handler function for Express middleware
export const globalErrorHandler = GlobalExceptionHandler.handle;

// Async error wrapper remains the same
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};