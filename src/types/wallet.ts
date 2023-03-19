import {Types} from 'mongoose';

export interface CreateWalletProps {
    userId: Types.ObjectId,
    balance: number,
    amountInTrust: number,
}
export interface GetWalletProps {
      userId: Types.ObjectId,
}