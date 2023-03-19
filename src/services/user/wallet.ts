import Wallet from '../../models/Wallet';
import WalletTransaction from '../../models/WalletTransaction';
import { SUCCESS, SERVER_ERROR, NOT_FOUND } from '../../utils/statusCode';
import { Request, Response } from 'express';
import { CreateWalletProps, GetWalletProps } from '../../types/wallet';
import { CreateWalletTransactionProps } from '../../types/wallet-transaction';
import mongoose, { HydratedDocument, ClientSession } from 'mongoose';
import { performTransaction } from '../../utils/databaseTransaction';

type WalletModel = HydratedDocument<CreateWalletProps>
type WalletTransactionModel = HydratedDocument<CreateWalletTransactionProps>

export const createUserWallet = async (walletData: CreateWalletProps) => {
  try {
    Wallet.create(walletData)
  } catch (error) {
    console.log(error)
  }
}

export const getUserWalletBallance = async (req: Request, res: Response) => {
  const userId = req.params.suserId
  try {
    const wallet = await Wallet.findOne({ sellerId: userId });
    if (!wallet) return res.status(NOT_FOUND).json({ status: NOT_FOUND, message: 'no wallet found', success: false });
    return res.status(SUCCESS).json({ status: SUCCESS, message: 'success', success: true, payload: wallet });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: error, success: false });
  }
};

/**
 * Finds a wallet by user ID.
 *
 * @param {mongoose.Types.ObjectId} userId
 * @returns {Promise<WalletModel | null>}
 */
export const findWalletByUserId = async (userId: mongoose.Types.ObjectId): Promise<WalletModel | null> => {
  return Wallet.findOne({ userId });
};

/**
 * Credits a wallet balance and creates a transaction record.
 *
 * @param {mongoose.Types.ObjectId} userId 
 * @param {number} amount 
 * @param {string} purpose 
 * @returns {Promise<WalletModel | null>}
 */
export const creditWalletBalance = async (userId: mongoose.Types.ObjectId, amount: number, purpose: string): Promise<WalletModel | null> => {
  let wallet: WalletModel | null = null;

  wallet = await findWalletByUserId(userId);

  if (!wallet) {
    throw new Error('Wallet not found');
  }

  await performTransaction(async (session) => {

    wallet.balance += amount;
    await wallet.save({ session });

    const inTrust = false;
    const transaction = await createWalletTransaction(wallet, amount, purpose, 'credit', inTrust, session);
  });

  return wallet;
};

/**
 * Credits a wallet amount in trust and creates a transaction record.
 *
 * @param {mongoose.Types.ObjectId} userId 
 * @param {number} amount 
 * @param {string} purpose 
 * @returns {Promise<WalletModel | null>}
 */
export const creditWalletAmountInTrust = async (userId: mongoose.Types.ObjectId, amount: number, purpose: string): Promise<WalletModel | null> => {
  let wallet: WalletModel | null = null;

  wallet = await findWalletByUserId(userId);

  if (!wallet) {
    throw new Error('Wallet not found');
  }

  await performTransaction(async (session) => {

    wallet.amountInTrust += amount;
    await wallet.save({ session });

    const inTrust = true;
    const transaction = await createWalletTransaction(wallet, amount, purpose, 'credit', inTrust, session);
  });

  return wallet;
}

/**
 * Debits a wallet balance and creates a transaction record.
 *
 * @param {mongoose.Types.ObjectId} userId 
 * @param {number} amount
 * @param {string} purpose
 * @returns {Promise<WalletModel | null>}
 */
export const debitWalletBalance = async (userId: mongoose.Types.ObjectId, amount: number, purpose: string): Promise<WalletModel | null> => {
  let wallet: WalletModel | null = null;

  wallet = await findWalletByUserId(userId);

  if (!wallet) {
    throw new Error('Wallet not found');
  }

  if (wallet.balance < amount) {
    throw new Error('Insufficient wallet balance');
  }  

  await performTransaction(async (session) => {

    wallet.balance -= amount;
    await wallet.save({ session });

    const inTrust = false;
    const transaction = await createWalletTransaction(wallet, amount, purpose, 'debit', inTrust, session);
  });

  return wallet;
}

/**
 * Debits a wallet amount in trust and creates a transaction record.
 *
 * @param {mongoose.Types.ObjectId} userId 
 * @param {number} amount
 * @param {string} purpose
 * @returns {Promise<WalletModel | null>}
 */
export const debitWalletAmountInTrust = async (userId: mongoose.Types.ObjectId, amount: number, purpose: string): Promise<WalletModel | null> => {
  let wallet: WalletModel | null = null;

  wallet = await findWalletByUserId(userId);

  if (!wallet) {
    throw new Error('Wallet not found');
  }

  if (wallet.amountInTrust < amount) {
    throw new Error('Insufficient amount in trust');
  }  

  await performTransaction(async (session) => {

    wallet.amountInTrust -= amount;
    wallet.balance += amount;
    await wallet.save({ session });

    const inTrust = true;
    const transaction = await createWalletTransaction(wallet, amount, purpose, 'debit', inTrust, session);
  });

  return wallet;
}

/**
 * Creates a wallet transaction record.
 *
 * @param {WalletModel} wallet
 * @param {number} amount
 * @param {string} purpose
 * @param {string} type
 * @param {Boolean} inTrust
 * @returns {Promise<WalletTransactionModel>}
 */
const createWalletTransaction = async (wallet: WalletModel, amount: number, purpose: string, type: string, inTrust: Boolean, session: ClientSession): Promise<WalletTransactionModel> => {
  const transactionProps: CreateWalletTransactionProps = {
    amount,
    balance: wallet.balance,
    amountInTrust: wallet.amountInTrust,
    type,
    purpose,
    inTrust,
    userId: wallet.userId,
    walletId: wallet.id,
  };

  const transaction = await WalletTransaction.create([transactionProps], { session });
  return transaction[0];
};


/**
 * Retrieves wallet transaction records for a user by optional parameters.
 *
 * @param userId
 * @param startDate 
 * @param endDate
 * @param purpose 
 * @param inTrust
 * @param type
 * @returns {Promise<WalletTransactionModel[]>}
 */
export const getWalletTransactions = async (userId: mongoose.Types.ObjectId, type?: 'credit' | 'debit', inTrust?: boolean, startDate?: Date, endDate?: Date): Promise<WalletTransactionModel[]>  => {
  const query: any = { userId };

  if (startDate && endDate) {
    query.createdAt = { $gte: startDate, $lte: endDate };
  }

  if (inTrust !== undefined) {
    query.amountInTrust = inTrust ? { $gt: 0 } : 0;
  }

  if (type) {
    query.type = type;
  }

  // Return the array of wallet transaction records matching the provided parameters
  return WalletTransaction.find(query).sort({ createdAt: -1 }).exec();
}


