import mongoose from 'mongoose';
import { CreateWalletProps } from '../types/wallet';

const walletSchema = new mongoose.Schema<CreateWalletProps>(
  {
    withdrawableAmount: {
      type: Number,
      required: true,
    },

    amountInTrust: {
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
