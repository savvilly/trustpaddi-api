import {Types} from 'mongoose';

export enum TransactionTypeEnum {
    WITHDRAWAL = 'withdrawal',
    TRANSFER = 'transfer',
    FUNDING = 'funding',
    ORDER_PAYMENT = 'order_payment'
}

export enum TypeEnum {
    CREDIT = 'credit',
    DEBIT = 'debit'
}
  
export interface CreateWalletTransactionProps {
    userId: Types.ObjectId,
    balance: number,
    amountInTrust: number;
    type: TypeEnum,
    transactionType: TransactionTypeEnum,
    description: string,
}
export interface GetWalletTransactionProps {
      userId: Types.ObjectId,
}