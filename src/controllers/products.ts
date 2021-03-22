import { Response, Request } from "express";
import { IProduct } from "../types/products";
import User from "../models/users";
import Product from "../models/products";
import { decodeToken } from '../helpers/authorize';

export default class ProductsCtrl {
 getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      let products;
      const decode = decodeToken(req.headers.authorization);
      let userRegion;
      if (decode) {
        const userId = decode.userId;
        await User.findById({
          _id: userId
        }).then((foundUser) => {
          if (foundUser) {
            userRegion = foundUser.region;
          }
        });
        products = await Product.find({
          region: userRegion
        });
      } else {
        products = await Product.find();
      }

      // console.log(products);
      res.status(200).json({ products });

    } catch (error) {
      throw error
    }
  }

 addProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const body = req.body as Pick<IProduct, "name" | "description" | "address" | "region" | "img" >
      const product: IProduct = new Product({
        name: body.name,
        description: body.description,
        address: body.address,
        region: body.region.toLowerCase(),
        img: body.img,
        userId: req.params.userId
      })

      const newProduct: IProduct = await product.save()
      const allProducts: IProduct[] = await Product.find()

      res
        .status(201)
        .json({ message: "Product added", product: newProduct, products: allProducts })
    } catch (error) {
      throw error
    }
  }

 updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        params: { id },
        body,
      } = req
      const updateProduct: IProduct | null = await Product.findByIdAndUpdate(
        { _id: id },
        {
          ...body,
          userId: req.params.userId,
        },
      )
      const allProducts: IProduct[] = await Product.find()
      res.status(200).json({
        message: "Product updated",
        product: updateProduct,
        products: allProducts,
      })
    } catch (error) {
      throw error
    }
  }

 deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedProduct: IProduct | null = await Product.findByIdAndRemove(
        req.params.id
      )
      const allProducts: IProduct[] = await Product.find()
      res.status(200).json({
        message: "Product deleted",
        product: deletedProduct,
        products: allProducts,
      })
    } catch (error) {
      throw error
    }
  }
}

