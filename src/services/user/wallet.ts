import Wallet from '../../models/Wallet';
import { SUCCESS, SERVER_ERROR, NOT_FOUND } from '../../utils/statusCode';
import { Request, Response } from 'express';
import { CreateWalletProps, GetWalletProps } from '../../types/wallet';


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

export const updateUserWalletBallance = async (req: Request, res: Response) => {

}
