import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config({ path: __dirname + '/.env' });

const { JWT_ACCESS_TOKEN_SECRET_SEED } = process.env;

export const PersonalTokenCheck = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const token = req.header('Authorization');
  if (!token) {
    return res.status(404).json({ message: 'Not Found. Token is required' });
  }

  const { id: tokenId }: any = jwt.verify(token, String(JWT_ACCESS_TOKEN_SECRET_SEED));

  if (tokenId !== Number(id)) {
    return res.status(400).json({ message: 'Bad Request. The token does not contain the same information.' });
  }

  return next();
};
