import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      // unique: true
    },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/128/4140/4140037.png",
    },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt fields automatically

const User = mongoose.model("User", userSchema);

export default User;
