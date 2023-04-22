import mongoose, { Schema, Model } from 'mongoose';
import { CreateWalletTransactionProps, TransactionTypeEnum, TypeEnum } from '../types/wallet-transaction';

type WalletTransactionModel = Model<CreateWalletTransactionProps>;

const walletTransactionSchema = new Schema<CreateWalletTransactionProps>(
  {
    balance: {
      type: Number,
      required: true,
    },

    amountInTrust: {
      type: Number,
      required: true,
    },

    transactionType: {
      type: String,
      enum: Object.values(TransactionTypeEnum),
      required: true
    },

    type: {
      type: String,
      enum: Object.values(TypeEnum),
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<CreateWalletTransactionProps, WalletTransactionModel>('WalletTransaction', walletTransactionSchema);