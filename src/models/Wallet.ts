import mongoose, { Schema } from 'mongoose';
import { CreateWalletProps } from '../types/wallet';

const walletSchema = new Schema<CreateWalletProps>(
  {
    withdrawableAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    amountInTrust: {
      type: Number,
      required: true,
      min: 0,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
  },
  { timestamps: true },
);

walletSchema.virtual('totalAmount').get(function () {
  return this.withdrawableAmount + this.amountInTrust;
});

export default mongoose.model('Wallet', walletSchema);
