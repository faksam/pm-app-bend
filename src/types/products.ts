import { Document, ObjectId } from "mongoose"

export interface IProduct extends Document {
  name: string;
  description: string;
  address: string;
  region: string;
  img: Array<String>;
  owner: ObjectId;
  comments: Array<Object>;
}