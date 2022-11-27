import mongoose from 'mongoose';
import { WalletProps } from '../types/wallet';

const walletSchema = new mongoose.Schema<WalletProps>(
  {
    totalAmount: {
      type: Number,
      required: true,
    },
    withdrawalAmount: {
      type: Number,
      required: true,
    },
    trustAmount: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export default mongoose.model('Wallet', walletSchema);
