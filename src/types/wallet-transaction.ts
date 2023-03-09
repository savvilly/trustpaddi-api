import {Types} from 'mongoose';

export interface CreateWalletTransactionProps {
    userId: Types.ObjectId,
    walletId: Types.ObjectId,
    amount: number,
    balance: number,
    type: string,
    purpose: string
}
export interface GetWalletTransactionProps {
      userId: Types.ObjectId,
      walletId: Types.ObjectId,
}