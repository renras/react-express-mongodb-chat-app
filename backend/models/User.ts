import { Schema, Mixed, model } from "mongoose";
import isEmail from "validator/lib/isEmail";
import passportLocalMongoose from "passport-local-mongoose";

interface IUser {
  email: Mixed;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide email"],
    validate: {
      validator: isEmail,
      message: "Please provide valid email",
    },
  },
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});

const User = model<IUser>("User", userSchema);

export default User;
