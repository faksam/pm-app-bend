import { IProduct } from "../types/products"
import { model, Schema } from "mongoose"

const productSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    img: {
      type: Array,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [{
      type: Schema.Types.ObjectId,
      ref: "Comment",
    }],
  },
  { timestamps: true }
)

export default model<IProduct>("Product", productSchema)

