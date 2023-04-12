import { Schema, model } from "mongoose";

type IMessage = {
  from: string;
  body: string;
  createdAt: Date;
};

const messageSchema = new Schema<IMessage>({
  from: {
    type: String,
    required: [true, "from must be provided"],
  },
  body: {
    type: String,
    required: [true, "body must be provided"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Message = model<IMessage>("Message", messageSchema);

export default Message;
