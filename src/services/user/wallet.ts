import WalletTransaction from '../../models/WalletTransaction';
import { SUCCESS, SERVER_ERROR, FORBIDDEN, NOT_FOUND, BAD_REQUEST } from '../../utils/statusCode';
import { Request, Response } from 'express';
import { CreateWalletTransactionProps, TypeEnum, TransactionTypeEnum } from '../../types/wallet-transaction';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import User from '../../models/User';
import bcrypt from 'bcrypt';

type WalletTransactionModel = HydratedDocument<CreateWalletTransactionProps>

/**
 * Retrieve user transactions based on user ID.
 * 
 * @param {mongoose.Types.ObjectId} userId
 * @returns {Array} 
 * @throws {Error}
 */
const getUserTransactions = async (userId: Types.ObjectId): Promise<CreateWalletTransactionProps[]> => {
  try {
    return await WalletTransaction.find({ userId }).exec();
  } catch (error) {
    throw new Error('Failed to retrieve user transactions');
  }
};

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
    const transactions = await getUserTransactions(userId);

    const balance = calculateBalance(transactions);
    const amountInTrust = calculateAmountInTrust(transactions);

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
 * Calculate balance from an array of transactions based on transaction type and balance field.
 * 
 * @param {Array} transactions 
 * @returns {number}
 */
const calculateBalance = (transactions: CreateWalletTransactionProps[]): number => {
  const creditBalance = calculateTransactionBalance(transactions, 'credit', 'balance');
  const debitBalance = calculateTransactionBalance(transactions, 'debit', 'balance');
  const balance = creditBalance - debitBalance;

  return balance;
};

/**
 * Calculate amount in trust from an array of transactions based on transaction type and amount in trust field.
 * 
 * @param {Array} transactions
 * @returns {number}
 */
const calculateAmountInTrust = (transactions: CreateWalletTransactionProps[]): number => {
  const creditAmountInTrust = calculateTransactionBalance(transactions, 'credit', 'amountInTrust');
  const debitAmountInTrust = calculateTransactionBalance(transactions, 'debit', 'amountInTrust');
  const amountInTrust = creditAmountInTrust - debitAmountInTrust;

  return amountInTrust;
};

/**
 * Calculates balance based on transaction type and field.
 * 
 * @param transactions {CreateWalletTransactionProps[]} 
 * @param type {string}
 * @param field {string}
 * @returns {number}
 */
const calculateTransactionBalance = (transactions: CreateWalletTransactionProps[], type: string, field: string): number => {
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
 * Get wallet transactions for a user by filters.
 *
 * @param req {Request}
 * @param res {Response}
 * @returns {Promise<Response>}
 */
export const getWalletTransactionsByFilters = async (req: Request, res: Response): Promise<Response> => {
  const { type, transaction_type, start_date, end_date } = req.query;
  const userId = new mongoose.Types.ObjectId(req.user.userId);

  const query: any = { userId };

  if (type) {
    query.type = type;
  }

  if (transaction_type) {
    query.transactionType = transaction_type;
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

/**
 * Check if user has sufficient balance to be debited.
 *
 * @param userId {ObjectId}
 * @param amount {number}
 * @returns {Promise<boolean>}
 * @throws {Error}
 */
export const hasSufficientBalance = async (userId: mongoose.Types.ObjectId, amount: number): Promise<boolean> => {
  try {
    const transactions = await getUserTransactions(userId);
    const balance = calculateBalance(transactions);

    if (balance >= amount) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error('Failed to check user balance');
  }
};

/**
 * Transfer funds from user's wallet to a recipient.
 * 
 * @param {Request} req
 * @param {Response} res
 * @returns {Response}
 */
export const transferFunds = async (req: Request, res: Response): Promise<Response> => {
  const userId = req.user.userId;
  const { wallet_pin, recipient_customer_code, amount } = req.body;
  
  try {
    const user = await User.findById(userId);

    // Check if user's wallet PIN is set
    if (!user.walletPin) {
      return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: 'Wallet PIN not set', success: false });
    }

    // Verify user's PIN
    const pinMatch = await bcrypt.compare(wallet_pin.toString(), user.walletPin);
    if (!pinMatch) {
      return res.status(FORBIDDEN).json({ status: FORBIDDEN, message: 'Incorrect wallet PIN', success: false });
    }

    // Check if recipient exists
    const recipient = await User.findOne({ customerCode: recipient_customer_code });
    if (!recipient) {
      return res.status(NOT_FOUND).json({ status: NOT_FOUND, message: 'Recipient not found', success: false });
    }

    // Check if recipient is the currently logged in user
    if (recipient.customerCode === user.customerCode) {
      return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: 'You cannot transfer money to yourself', success: false });
    }

    // Check if user has enough balance in their wallet
    const hasBalance = await hasSufficientBalance(userId, amount);
    if (!hasBalance) {
      return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: 'Insufficient wallet balance', success: false });
    }

    // Perform fund transfer
    const debitCustomerDescription = `Debit for fund transfer to recipient with code ${recipient_customer_code}`;
    const creditRecipientDescription = `Credit from fund transfer from sender with code ${user.customerCode}`;
    const debitCustomer = await debitWalletBalance(userId, amount, debitCustomerDescription, TransactionTypeEnum.TRANSFER);
    const creditRecipient = await creditWalletBalance(recipient._id, amount, creditRecipientDescription, TransactionTypeEnum.TRANSFER);

    return res.status(SUCCESS).json({ status: SUCCESS, message: 'Funds transferred successfully', success: true });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: error.message, success: false });
  }
};


