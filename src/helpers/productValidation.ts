import { NextFunction, Request, Response } from 'express';
import Validator from 'validatorjs';

export const ProductValidation: any = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, description, address, region, img,
  } = req.body;

  const validation = new Validator(
    {
      name, 
      description, 
      address, 
      region, 
      img, 
    },
    {
      name: 'required|string',
      description: 'required|string',
      address: 'required|string',
      region: 'required|string',
      img: 'required|string',
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
};

export default ProductValidation;
