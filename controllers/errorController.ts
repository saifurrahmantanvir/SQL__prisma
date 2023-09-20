import { Request, Response, NextFunction } from 'express';

type APIError = Error & {
  statusCode: number;
  status: string;
  isOperational: boolean;
};

const sendErrorDev = (
  error: APIError,
  req: Request,
  res: Response
) => {
  const {
    status,
    statusCode,
    message,
    stack
  } = error;

  /* if (req.originalUrl.startsWith('/api')) {} */

  return res.status(statusCode).json({
    status,
    error,
    message,
    stack
  });
};

const sendErrorProd = (
  error: APIError,
  req: Request,
  res: Response
) => {
  const {
    status,
    statusCode,
    message,
    isOperational
  } = error;

  if (req.originalUrl.startsWith('/api')) {
    if (isOperational) {
      return res.status(statusCode).json({
        status,
        message
      });
    }

    console.log('🛑 Error -> ', error);

    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
      error
    });
  }
};

type GlobalError = Error & {
  sqlMessage: string;
  statusCode: number;
  status: string;
  isOperational: boolean;
};

export default (
  err: GlobalError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = {
    status: 'error',
    statusCode: 500,
    ...err,
    message: err.sqlMessage ? err.sqlMessage : err.message
  };

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProd(error, req, res);
  }
};
