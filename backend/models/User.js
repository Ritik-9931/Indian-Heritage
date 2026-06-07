import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    avatar: {
      url: String,
      public_id: String,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    favoriteTemples: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Temple",
      },
    ],

    visitedTemples: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Temple",
      },
    ],

    googleId: {
      type: String,
    },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
