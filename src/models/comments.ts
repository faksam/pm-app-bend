import { IComment } from "../types/comments"
import { model, Schema } from "mongoose"

const commentSchema: Schema = new Schema(
  {
    parentId: {
      type: String,
      required: false,
    },
    comment: {
      type: String,
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  },
  { timestamps: true }
)

export default model<IComment>("Comment", commentSchema)

