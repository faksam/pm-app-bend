import { NextFunction, Request, Response } from 'express';
import User from "../models/users"

export const verifyUserEmail = (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email || req.query.email;
  User.findOne({
    email: req.body.email,
  }).then((foundUser) => {
    if (foundUser) { return next(); }

    console.log(req.body);
    return res.status(400).send({
      success: false,
      status: 400,
      error: {
        message: 'User email not found',
      },
    });

  });
};

export default verifyUserEmail;
