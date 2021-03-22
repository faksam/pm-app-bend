import { NextFunction, Request, Response } from 'express';
import Validator from 'validatorjs';

/**
 * @class UserInputValidation
 */
class UserInputValidation {
  /**
   * validate user input on signIn
   *
   * @param {object} formInput
   *
   * @returns {boolean} true
   * @returns {object} errors
   */
  static signInInputValidation(req: Request, res: Response, next: NextFunction) {
    const {
      email, password,
    } = req.body;

    const validation = new Validator(
      {
        email,
        password,
      },
      {
        email: 'required|string|email',
        password: 'required|min:8|max:40',
      }
    );

    if (validation.passes()) {
      return next();
    }
    {
      const errors = validation.errors.all();
      return res.status(400).send({
        success: false,
        status: 400,
        error: errors,
      });
    }
  }

  /**
   * validate user input on signUp
   *
   * @param {object} formInput
   *
   * @returns {boolean} true
   * @returns {object} errors
   */
  static signUpInputValidation(req: Request, res: Response, next: NextFunction) {
    const {
      name, email, password, confirmPassword, phone, address, region,
    } = req.body;

    const validation = new Validator(
      {
        name,
        phone: phone,
        email,
        password,
        password_confirmation: confirmPassword,
        region,
        address,
      },
      {
        name: 'required|string|min:2|max:40',
        region: 'required|string|min:2|max:40',
        email: 'required|string|email',
        password: 'required|min:8|max:40|confirmed',
        password_confirmation: 'required',
        phone: 'string|max:40',
        address: 'required|string|max:100',
      }
    );

    if (validation.passes()) {
      return next();
    }
    {
      const errors = validation.errors.all();
      return res.status(400).send({
        success: false,
        status: 400,
        error: errors,
      });
    }
  }
}

export default UserInputValidation;
