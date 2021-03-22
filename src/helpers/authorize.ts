import jwt from 'jwt-simple';
import { Request, Response } from 'express';
import { NextFunction } from 'express';
import { IUser } from '../types/users';
import User from "../models/users"

/**
 * @description - Decode user token if token is valid
 *
 * @param {*} userToken the token parameter passed with HTTP request.headers.authorization
 * @returns {boolean||object} false if token is invalid and token object if token is valid
 */
export const decodeToken = (userToken: any) => {
  const error = {message: {}};
  let decode;
  if (userToken && userToken.split(' ')[0] === 'Bearer') {
    const authHeader = userToken.split(' ');
    try {
      decode = jwt.decode(authHeader[1], 'LifeIsARace');
    } catch (err) {
      error.message = err;
    }
  }
  if (decode === '') {
    return false;
  }
  return decode;
};

/**
 * @description - Authorize User
 *
 * @param {object} req HTTP Request
 * @param {object} res HTTP Response
 * @param {object} next call next funtion/handler
 * @returns {object} returns res HTTP Response
 */
export const authorizeUser = async (req: Request, res: Response, next: NextFunction) => {
  const error = {
    message: ''
  };
  const decode = decodeToken(req.headers.authorization);
  
  if(decode) req.params.userId = decode.userId;
  try {
    const currentUser: IUser | null = await User.findById(decode.userId);
    if (!currentUser) {
      return res.status(403).send({
        success: false,
        status: 403,
        error: {
          message: 'You are Forbidden.'
        },
      });
    }
    return next();
  } catch(error) {
    return res.status(403).send({
      success: false,
      status: 403,
      error: {
        message: 'You are not authorized. You do not seem to be logged in, please login and try again.'
      },
    });
  }
};

