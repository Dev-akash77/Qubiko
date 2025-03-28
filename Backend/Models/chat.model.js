import { model, Schema } from "mongoose";

const chatSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    heading: { type: String, required: true },
    message:[
      {
        question:{type:String,required:true},
        answer:{type:String,default:"Loading"},
        createdAt: { type: Date, default: Date.now }
      }
    ],
  },
  { timestamps: true }
);

export const chatModel = model("Chat", chatSchema);
 