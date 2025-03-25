import { model, Schema } from "mongoose";

const chatSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    heading: { type: String, required: true },
    message: { type: Array, default: [] },
  },
  { timestamps: true }
);

export const chatModel = model("Chat", chatSchema);
 