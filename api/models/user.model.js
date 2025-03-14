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
    avatar: { type: String,
      default: "https://estudent.astu.edu.et/api/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBN2VtQWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--09bde2b84da8ca332c0a556a54d272d63afc527a/1716708330046.jpg"
     },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt fields automatically

const User = mongoose.model("User", userSchema);

export default User;
