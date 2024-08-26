import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name Harus diisi"],
  },
  email: {
    type: String,
    required: [true, "Email Harus diisi"],
  },
  password: {
    type: String,
    required: [true, "Password Harus diisi"],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
