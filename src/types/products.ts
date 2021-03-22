import { Document } from "mongoose"

export interface IProduct extends Document {
  name: string;
  description: string;
  address: string;
  region: string;
  img: string;
}