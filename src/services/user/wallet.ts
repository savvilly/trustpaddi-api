import WalletTransaction from '../../models/WalletTransaction';
import { SUCCESS, SERVER_ERROR } from '../../utils/statusCode';
import { Request, Response } from 'express';
import { CreateWalletTransactionProps, TypeEnum, TransactionTypeEnum } from '../../types/wallet-transaction';
import mongoose, { HydratedDocument, Types } from 'mongoose';

type WalletTransactionModel = HydratedDocument<CreateWalletTransactionProps>

/**
 * Get user wallet balance.
 *
 * @param req {Request} 
 * @param res {Response} 
 * @returns {Response} 
 * @throws {Error}
 */
export const getUserWalletBalance = async (req: Request, res: Response) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.userId);
    const transactions = await WalletTransaction.find({ userId }).exec();

    const creditBalance = calculateBalance(transactions, 'credit', 'balance');
    const debitBalance = calculateBalance(transactions, 'debit', 'balance');
    const creditAmountInTrust = calculateBalance(transactions, 'credit', 'amountInTrust');
    const debitAmountInTrust = calculateBalance(transactions, 'debit', 'amountInTrust');

    const balance = creditBalance - debitBalance;
    const amountInTrust = creditAmountInTrust - debitAmountInTrust;

    const payload = {
      balance,
      amountInTrust
    };

    return res.status(SUCCESS).json({ status: SUCCESS, message: "User wallet balance retrieved", success: true, payload })
  } catch (error) {
    return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: error.message, success: false });
  }
};

/**
 * Calculates balance based on transaction type and field.
 * 
 * @param transactions {CreateWalletTransactionProps[]} 
 * @param type {string}
 * @param field {string}
 * @returns {number}
 */
const calculateBalance = (transactions: CreateWalletTransactionProps[], type: string, field: string): number => {
  let balance = 0;
  transactions.forEach((transaction: any) => { 
    if (transaction.type === type && transaction[field] !== 0) {
      balance += transaction[field];
    }
  });
  return balance;
};

/**
 * Credit the balance of a user's wallet with the given amount.
 *
 * @param userId {mongoose.Types.ObjectId} 
 * @param amount {number} 
 * @param description {string} 
 * @returns {Promise<WalletTransactionModel | null>}
 */
export const creditWalletBalance = async (userId: mongoose.Types.ObjectId, amount: number, description: string, transactionType: TransactionTypeEnum): Promise<WalletTransactionModel | null> => {

  const transactionData = {
    amount,
    description,
    type: TypeEnum.CREDIT,
    transactionType,
    inTrust: false,
    userId
  };

  const transaction = await createWalletTransaction(transactionData);

  return transaction;
};

/**
 * Credit the amount in trust of a user's wallet with the given amount.
 *
 * @param userId {mongoose.Types.ObjectId} 
 * @param amount {number} 
 * @param description {string} 
 * @returns {Promise<WalletTransactionModel | null>}
 */
export const creditAmountInTrust = async (userId: mongoose.Types.ObjectId, amount: number, description: string, transactionType: TransactionTypeEnum): Promise<WalletTransactionModel | null> => {

  const transactionData = {
    amount,
    description,
    type: TypeEnum.CREDIT,
    transactionType,
    inTrust: true,
    userId
  };

  const transaction = await createWalletTransaction(transactionData);

  return transaction;
};

/**
 * Debit the balance of a user's wallet with the given amount.
 *
 * @param userId {mongoose.Types.ObjectId} 
 * @param amount {number} 
 * @param description {string} 
 * @returns {Promise<WalletTransactionModel | null>}
 */
export const debitWalletBalance = async (userId: mongoose.Types.ObjectId, amount: number, description: string, transactionType: TransactionTypeEnum): Promise<WalletTransactionModel | null> => {

  const transactionData = {
    amount,
    description,
    type: TypeEnum.DEBIT,
    transactionType,
    inTrust: false,
    userId
  };

  const transaction = await createWalletTransaction(transactionData);

  return transaction;
};

/**
 * Debit the amount in trust of a user's wallet with the given amount.
 *
 * @param userId {mongoose.Types.ObjectId} 
 * @param amount {number} 
 * @param description {string} 
 * @returns {Promise<WalletTransactionModel | null>}
 */
export const debitAmountInTrust = async (userId: mongoose.Types.ObjectId, amount: number, description: string, transactionType: TransactionTypeEnum): Promise<WalletTransactionModel | null> => {

  const transactionData = {
    amount,
    description,
    type: TypeEnum.DEBIT,
    transactionType,
    inTrust: true,
    userId
  };

  const transaction = await createWalletTransaction(transactionData);

  return transaction;
};

/**
 * Create a wallet transaction.
 *
 * @param transactionData {Object}
 * @param transactionData.amount {number}
 * @param transactionData.description {string} 
 * @param transactionData.type, {string}
 * @param transactionData.inTrust {boolean}
 * @param transactionData.userId {Types.ObjectId}
 * @returns {Promise<WalletTransactionModel>}
 */
const createWalletTransaction = async (transactionData: {
  amount: number,
  description: string,
  type: TypeEnum,
  transactionType: TransactionTypeEnum,
  inTrust: boolean,
  userId: Types.ObjectId,
}): Promise<WalletTransactionModel> => {
  const { amount, description, type, transactionType, inTrust, userId } = transactionData;

  const balance = inTrust ? 0 : amount;
  const amountInTrust = inTrust ? amount : 0;

  const transactionProps: CreateWalletTransactionProps = {
    balance,
    amountInTrust,
    type,
    transactionType,
    description,
    userId,
  };

  const transaction = await WalletTransaction.create([transactionProps]);
  return transaction[0];
};

/**
 * Get wallet transactions for a user by filters (type and date range).
 *
 * @param req {Request}
 * @param res {Response}
 * @returns {Promise<Response>}
 */
export const getWalletTransactions = async (req: Request, res: Response): Promise<Response> => {
  const { type, start_date, end_date } = req.query;
  const userId = new mongoose.Types.ObjectId(req.user.userId);

  const query: any = { userId };

  if (type) {
    query.type = type;
  }

  if (start_date && end_date) {
    const start = new Date(start_date.toString());
    const end = new Date(end_date.toString());

    query.createdAt = { $gte: start, $lte: end };
  }

  try {
    const transactions = await WalletTransaction.find(query).sort({ createdAt: -1 });

    return res.status(SUCCESS).json({ status: SUCCESS, message: "User wallet transactions retrieved", success: true, payload: transactions })
  } catch (error) {
    return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: error.message, success: false });
  }
};



