import {Types} from 'mongoose';

export interface CreateWalletTransactionProps {
    userId: Types.ObjectId,
    walletId: Types.ObjectId,
    amount: number,
    balance: number,
    amountInTrust: number;
    type: string,
    purpose: string,
    inTrust: Boolean,
}
export interface GetWalletTransactionProps {
      userId: Types.ObjectId,
      walletId: Types.ObjectId,
}