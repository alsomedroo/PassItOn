import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  resetToken: { type: String },
  resetTokenExpires: { type: Number },
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
