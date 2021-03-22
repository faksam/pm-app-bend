import { Router } from "express";
import ProductsCtrl from "../controllers/products";
import { authorizeUser } from '../helpers/authorize';
import ProductValidation from '../helpers/productValidation';


const ProductsController = new ProductsCtrl();

export default (app: any) => {
  app.get("/products", ProductsController.getProducts);
  app.post("/products", authorizeUser, ProductValidation, ProductsController.addProduct);
  app.put("/products/:id", authorizeUser, ProductsController.updateProduct);
  app.delete("/products/:id", authorizeUser, ProductsController.deleteProduct);
}
