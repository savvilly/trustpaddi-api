import Wallet from '../../models/Wallet';
import { SUCCESS, SERVER_ERROR } from '../../utils/statusCode';
import { Request, Response } from 'express';

export const getUserWalletBallance = async (req: Request, res: Response) => {
  const sellerId = req.params.sellerId;
  try {
    const wallet = await Wallet.findOne({ sellerId: sellerId });
    if (!wallet) throw new Error('Seller wallet not found');
    return res.status(SUCCESS).json({ status: SUCCESS, message: 'success', success: true, payload: wallet });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: error, success: false });
  }
};

export const updateUserWalletBallance = async (req: Request, res: Response) => {
  
}
