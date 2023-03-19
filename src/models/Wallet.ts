import mongoose, { Schema, Model } from 'mongoose';
import { CreateWalletProps } from '../types/wallet';

type WalletModel = Model<CreateWalletProps>;

const walletSchema = new Schema<CreateWalletProps>(
  {
    balance: {
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
  return this.balance + this.amountInTrust;
});

export default mongoose.model<CreateWalletProps, WalletModel>('Wallet', walletSchema)
