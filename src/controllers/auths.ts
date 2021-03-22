import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jwt-simple';
import { IUser } from "../types/users";
import User from "../models/users";
import dotenv from 'dotenv';

dotenv.config();

let userToken: any;

/**
 * @description - Create Token
 * @static
 *
 * @param {object} user - User Object
 *
 * @returns {object} Encoded token
 */
const tokenForUser = (user: any) => {
  const timestamp = new Date().getTime();
  return jwt.encode({
    email: user.email, userId: user.id, iat: timestamp,
  }, 'LifeIsARace');
};


export default class AuthsCtrl {
/**
 * @description - Signup a new user
 * @static
 *
 * @param {object} req - HTTP Request
 * @param {object} res - HTTP Response
 *
 * @memberOf authController
 *
 * @returns {object} response HTTP Response JSON Object
 */
 signup = async (req: Request, res: Response) => {
    const {
      email, password,
      name, phone, address, region
    } = req.body;
    const body = req.body;
  

    const saltRounds = 12;
    bcrypt.hash(password, saltRounds)
      .then(async (hash) => {
        const user: IUser = new User({
          name: body.name,
          phone: body.phone,
          address: body.address,
          region: body.region.toLowerCase(),
          email: email.toLowerCase(),
          password: hash,
        });

        const newUser: IUser = await user.save();
        userToken = tokenForUser(newUser);
        res.set('authorization', userToken).status(201).send({
          success: true,
          status: 201,
          token: userToken,
          data: {
            userId: newUser.id,
            email: newUser.email,
          },
        });
      });
    };


/**
 * @description - Login a new user
 * @static
 *
 * @param {object} req - HTTP Request
 * @param {object} res - HTTP Response
 *
 * @memberOf authController
 * @returns {object} response HTTP Response JSON Object
 */
 login = (req: Request, res: Response) => {
    const {
      email, password,
    } = req.body;
    const userEmail = email.toLowerCase();
    User.findOne({
      'email': userEmail,
    }).then((user: IUser | null) => {
        if (user && user.password) {
          bcrypt.compare(password, user.password)
            .then((validPassword: any) => {
              if (validPassword) {
                userToken = tokenForUser(user);
                res.set('authorization', userToken).status(200).send({
                  success: true,
                  status: 200,
                  token: userToken,
                  data: {
                    firstname: user.name,
                    email: user.email,
                  },
                });
              } else {
                res.status(400).send({
                  success: false,
                  status: 400,
                  error: {
                    message: 'Invalid Email or Password.',
                  },
                });
              }
            });
        }
      });
    };
}
