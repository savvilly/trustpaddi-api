import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema(
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
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export default mongoose.model('Wallet', walletSchema);
