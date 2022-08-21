import { NextFunction, Request, Response } from 'express';

export const TokenCheck = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(404).json({ message: 'Not Found. Token is required' });
  }
  return next();
};
