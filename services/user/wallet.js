import Wallet from '../../models/Wallet';
import { SUCCESS } from '../../utils/statusCode';

export const getUserWalletBalance = async (req, res, next) => {
  const sellerId = req.params.sellerId;
  try {
    const wallet = await Wallet.findOne({ sellerId: sellerId });
    if (!wallet) throw new Error('Seller wallet not found');
    return res.status(SUCCESS).json({ status: SUCCESS, message: 'success', success: true, payload: wallet });
  } catch (error) {
    return next(error);
  }
};
