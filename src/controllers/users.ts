import { Response, Request } from "express"
import { IUser } from "../types/users"
import User from "../models/users"

export default class UsersCtrl {
  getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users: IUser[] = await User.find()
      res.status(200).json({ users })
    } catch (error) {
      throw error
    }
  }
  
  addUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const body = req.body as Pick<IUser, "name" | "email" | "phone" | "address" | "region" >
  
      const user: IUser = new User({
        name: body.name,
        email: body.email,
        phone: body.phone,
        address: body.address,
        region: body.region,
      });
  
      const newUser: IUser = await user.save()
      const allUsers: IUser[] = await User.find()
  
      res
        .status(201)
        .json({ message: "User added", user: newUser, users: allUsers })
    } catch (error) {
      throw error
    }
  }
  
  updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        params: { id },
        body,
      } = req
      const updateUser: IUser | null = await User.findByIdAndUpdate(
        { _id: id },
        body
      )
      const allUsers: IUser[] = await User.find()
      res.status(200).json({
        message: "User updated",
        user: updateUser,
        users: allUsers,
      })
    } catch (error) {
      throw error
    }
  }
  
  deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedUser: IUser | null = await User.findByIdAndRemove(
        req.params.id
      )
      const allUsers: IUser[] = await User.find()
      res.status(200).json({
        message: "User deleted",
        user: deletedUser,
        users: allUsers,
      })
    } catch (error) {
      throw error
    }
  }
}

