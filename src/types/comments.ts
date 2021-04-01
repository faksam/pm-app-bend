import { Document, ObjectId } from "mongoose"

export interface IComment extends Document {
  parentId: string;
  comment: string;
  owner: ObjectId;
  product: ObjectId;
}