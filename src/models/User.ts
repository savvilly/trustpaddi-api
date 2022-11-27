import mongoose from 'mongoose';
import { UserProps } from '../types/user';

const UserSchema = new mongoose.Schema<UserProps>(
  {
    _id: mongoose.Schema.Types.ObjectId,
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    referral_code: {
      type: String,
    },
    avatar: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    lga: {
      type: String,
    },
    address: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    customer_code: {
      type: String,
    },
    isKYCVerified: {
      type: Boolean,
      default: false,
    },
    bankAccount: {
      type: String,
    },
    bankAccountName: {
      type: String,
    },
    bankName: {
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    }
  },
  { timestamps: true },
);

export default mongoose.model('User', UserSchema);
