import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name Harus diisi"],
    unique: [true, "Username sudah digunakan"],
  },
  email: {
    type: String,
    required: [true, "Email Harus diisi"],
    unique: [true, "Username sudah didaftarkan"],
    // validate menggunakan package validator
    validate: {
      validator: validator.isEmail,
      message: "inputan harus berformat Email foo@info.com",
    },
  },
  password: {
    type: String,
    required: [true, "Password Harus diisi"],
    minLength: [6, "Password minimal 6 karakter"],
  },
  role: {
    type: String,
    enum: ["user", "owner"],
    default: "user",
  },
});

// sebelum di save jalankan userSchema dengan bcrypt
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10); // enkripsi password sebanyak 10
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (reqBody) {
  return await bcrypt.compare(reqBody, this.password); // compare reqBody yg kita dapat dengan pw yg ada di DB
};

const User = mongoose.model("User", userSchema);

export default User;
