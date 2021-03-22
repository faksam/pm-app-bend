import { Router } from "express"
import UsersCtrl from "../controllers/users"
import { authorizeUser } from '../helpers/authorize';

const UsersController = new UsersCtrl();

export default (app: any) => {
  app.get("/users", authorizeUser, UsersController.getUsers);
  app.post("/users", authorizeUser, UsersController.addUser);
  app.put("/users/:id", authorizeUser, UsersController.updateUser);
  app.delete("/users/:id", authorizeUser, UsersController.deleteUser);
}


