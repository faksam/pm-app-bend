import { Response, Request } from "express";
import { IComment } from "../types/comments";
import Product from "../models/products";
import Comment from "../models/comments";
import { decodeToken } from '../helpers/authorize';

export default class CommentsCtrl {
 getComments = async (req: Request, res: Response): Promise<void> => {
    try {
      let comments;
      let productComment = '';
  
      if (req.query.productId) {
        await Product.findById({
          _id: req.query.productId
        }).then((foundProduct) => {
          if (foundProduct) {
            productComment = foundProduct.id;
          }
        });
        comments = await Comment.find({
          productId: productComment
        });
      } else {
        comments = await Comment.find();
      }

      res.status(200).json({ comments });

    } catch (error) {
      throw error
    }
  }


  getComment = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        params: { id },
      } = req
      const foundComment: IComment | null = await Comment.findById(
        { _id: id },
      )
      res.status(200).json({
        message: "Found Comment",
        comment: foundComment,
      })
    } catch (error) {
      throw error
    }
  }

 addComment = async (req: Request, res: Response): Promise<void> => {
    try {
      const body = req.body;
      const decode = decodeToken(req.headers.authorization);

      const comment: IComment = new Comment({
        comment: body.comment,
        parentId: body.parentId,
        product: body.productId,
        owner: decode.userId,
      })

      const newComment: IComment = await comment.save()
      const allComments: IComment[] = await Comment.find()
      
      await Product.findById({
        _id: body.productId
      }).then((foundProduct) => {
        if (foundProduct) {
          foundProduct.comments.push(newComment);
          foundProduct.save();
        }
      });

      res
        .status(201)
        .json({ message: "Comment added", comment: newComment, comments: allComments })
    } catch (error) {
      throw error
    }
  }

 updateComment = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        params: { id },
        body,
      } = req
      const updateComment: IComment | null = await Comment.findByIdAndUpdate(
        { _id: id },
        {
          ...body,
        },
      )
      const allComments: IComment[] = await Comment.find()
      res.status(200).json({
        message: "Comment updated",
        comment: updateComment,
        comments: allComments,
      })
    } catch (error) {
      throw error
    }
  }

 deleteComment = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedComment: IComment | null = await Comment.findByIdAndRemove(
        req.params.id
      )
      const allComments: IComment[] = await Comment.find()
      res.status(200).json({
        message: "Comment deleted",
        comment: deletedComment,
        comments: allComments,
      })
    } catch (error) {
      throw error
    }
  }
}

