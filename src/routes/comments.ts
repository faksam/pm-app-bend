import { Router } from "express";
import CommentsCtrl from "../controllers/comments";
import { authorizeUser } from '../helpers/authorize';


const CommentsController = new CommentsCtrl();

export default (app: any) => {
  app.get("/comments", CommentsController.getComments);
  app.post("/comments", CommentsController.addComment);
  app.put("/comments/:id", authorizeUser, CommentsController.updateComment);
  app.delete("/comments/:id", authorizeUser, CommentsController.deleteComment);
}
