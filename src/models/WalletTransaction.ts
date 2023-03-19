import mongoose, { Schema, Model } from 'mongoose';
import { CreateWalletTransactionProps } from '../types/wallet-transaction';

type WalletTransactionModel = Model<CreateWalletTransactionProps>;

const walletTransactionSchema = new Schema<CreateWalletTransactionProps>(
  {
    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    balance: {
      type: Number,
      required: true,
    },

    amountInTrust: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    inTrust: {
      type: Boolean,
      default: false,
    },

    purpose: {
      type: String,
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },

    walletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wallet',
      index: true,
    },
  },
  { timestamps: true },
);


export default mongoose.model<CreateWalletTransactionProps, WalletTransactionModel>('WalletTransaction', walletTransactionSchema)
