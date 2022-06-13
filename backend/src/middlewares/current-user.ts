import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return next();
  }

  jwt.verify(token, process.env.JWT_KEY!, (err: any, decoded: any) => {
    if (err) {
      return next()
    };

    req.currentUser = decoded

    next();
  });

};
