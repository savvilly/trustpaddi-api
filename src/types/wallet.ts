import {Types} from 'mongoose';

export interface CreateWalletProps {
    userId: Types.ObjectId,
    withdrawableAmount: number,
    amountInTrust: number,
}
export interface GetWalletProps {
      userId: Types.ObjectId,
}