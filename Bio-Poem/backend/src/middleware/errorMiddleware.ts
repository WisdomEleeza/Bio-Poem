import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error('An error occurred:', error);

  res.status(500).json({ error: 'Error in the Request processing' });
};

export default errorMiddleware