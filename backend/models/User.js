import mongoose from "mongoose";
import {
  ROLES,
  AUTH_PROVIDERS
} from "../config/constants.js";
import {
  generateSecret
} from "otplib";

const userSchema = new mongoose.Schema({
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
    default: null,
  },
  avatar: {
    type: String,
    default: "",
  },
  provider: {
    type: String,
    enum: Object.values(AUTH_PROVIDERS),
    default: AUTH_PROVIDERS.MANUAL,
  },
  role: {
    type: String,
    enum: Object.values(ROLES),
    default: ROLES.STUDENT,
  },
  college: {
    type: String,
    default: "",
  },
  company: {
    type: String,
    default: "",
  },
  github: {
    type: String,
    default: "",
  },
  linkedin: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  secret: {
    type: String,
    default: generateSecret(),
  }
}, {
  timestamps: true,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;