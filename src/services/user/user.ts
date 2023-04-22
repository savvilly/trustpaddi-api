import { Request, Response } from 'express';
import User from '../../models/User';
import { UserProps } from '../../types/user';
import { NOT_CREATED, CREATED, SERVER_ERROR, SUCCESS, FORBIDDEN } from '../../utils/statusCode';
import bcrypt from 'bcrypt';

export const updateProfile = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { _id, firstname, lastname, email, password, referral_code, avatar, phone, country, state, address, lga, bankAccount, bankAccountName, bankName } = req.body
		let data = { firstname, lastname, email, password, referral_code, avatar, phone, country, state, address, lga, bankAccount, bankAccountName, bankName }
		const user = await User.findByIdAndUpdate(_id, data, { new: true })
		if (!user) {
			return res.status(NOT_CREATED).json({ status: NOT_CREATED, message: "User not found or invalid user _id", success: false });
		} else {
			return res.status(SUCCESS).json({ status: SUCCESS, message: "profile updated successfuly", success: true, payload: user })
		}
	} catch (error) {
		return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: error, success: false });
	}
}

export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const user = await User.find({})
		return res.status(SUCCESS).json({ status: SUCCESS, message: "success", success: true, payload: user })
	} catch (error) {
		return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: error, success: false });
	}
}

export const setUserActiveStatus = async (req: Request, res: Response) => {
	try {
		const { _id, active } = req.body
		console.log(req.body)
		const user = await User.findByIdAndUpdate(_id, { active: active }, { new: true })
		if (!user) {
			return res.status(NOT_CREATED).json({ status: NOT_CREATED, message: "User not found or invalid user _id", success: false });
		} else {
			return res.status(SUCCESS).json({ status: SUCCESS, message: "Account status updated successfully", success: true, payload: user })
		}
	} catch (error) {
		return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: error, success: false });
	}
}


export const subDeleteUserAccount = async (req: Request, res: Response) => {
	try {
		const { _id, deleted } = req.body
		const user = await User.findByIdAndUpdate(_id, { deleted: deleted }, { new: true })
		if (!user) {
			return res.status(NOT_CREATED).json({ status: NOT_CREATED, message: "User not found or invalid user _id", success: false });
		} else {
			const userData = await User.findByIdAndUpdate(_id, { email: `del-${user.email}` }, { new: true })
			return res.status(SUCCESS).json({ status: SUCCESS, message: "profile updated successfuly", success: true, payload: userData })
		}
	} catch (error) {
		return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: error, success: false });
	}
}

/**
 * Update wallet PIN for a user.
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Response}
 */
export const updateWalletPin = async (req: Request, res: Response): Promise<Response>  => {
	const userId = req.user.userId;
	const walletPin = req.body.wallet_pin;

	try {
	  	const user = await User.findById(userId);
		const walletPinString = walletPin.toString();
		const hashedWalletPin = await bcrypt.hash(walletPinString, 10);
		user.walletPin = hashedWalletPin;
		await user.save();

		return res.status(SUCCESS).json({ status: SUCCESS, message: 'Wallet PIN set successfully', success: true });
	} catch (error) {
	  return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: error, success: false });
	}
};