import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    profileImage: String,
    isDeleted: {
      default: false,
      type: Boolean,
    },
    isEmailVerified: {
      default: false,
      type: Boolean,
    },
    
  },
  { Timestamp: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
