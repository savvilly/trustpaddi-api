import {Types} from 'mongoose';

export interface CreateWalletProps {
    userId: Types.ObjectId,
    totalAmount: number,
    withdrawalAmount: number,
    trustAmount: number,
}
export interface GetWalletProps {
      userId: Types.ObjectId,
}