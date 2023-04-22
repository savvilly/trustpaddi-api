import { Request, Response } from 'express';
import Store from '../../models/Store';
import { CREATED, SERVER_ERROR, BAD_REQUEST, SUCCESS, NOT_CREATED } from '../../utils/statusCode';
import { CreateStoreIProps } from '../../types/store';
import { useCloudinaryUplaod } from '../../utils/useCloudinary';

export const createStore = async (req: Request, res: Response): Promise<Response> => {
    const { storeName, logo } = req.body
    const userId = req.user.userId

    try {
        //checking if user already has a store created
        const store = await Store.findOne({ userId: userId })
        if (store) {
            return res.status(NOT_CREATED).json({ status: NOT_CREATED, message: "User already has a store", success: false });
        }

        const cloudLogo = await useCloudinaryUplaod(logo)
        const newStore: CreateStoreIProps = {
            storeName, logo: { url: `${cloudLogo.secure_url}`, public_id: `${cloudLogo.public_id}` }, userId
        }
        const result = await Store.create(newStore)
        if (result) {
            return res.status(CREATED).json({ status: CREATED, message: 'Store created', success: true, payload: result });
        }
    } catch (error) {
        return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: error, success: false });
    }
}


export const editStore = async (req: Request, res: Response): Promise<Response> => {
    const { storeName, logo, storeId } = req.body;
    const userId = req.user.userId

    try {
        const store = await Store.findOne({ _id: storeId, userId: userId })
        if (!store) {
            return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: `No store found for ${storeId} or access denied`, success: false });
        }

        const cloudLogo = await useCloudinaryUplaod(logo)
        const uploadData = { storeName, logo: { url: `${cloudLogo.secure_url}`, public_id: `${cloudLogo.public_id}` } }
        const updateStoreResult = await Store.findByIdAndUpdate({ _id: storeId }, uploadData)
        if (updateStoreResult) {
            return res.status(CREATED).json({ status: CREATED, message: 'Store updated', success: true });
        }
    } catch (error) {
        return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: error, success: false });
    }
}

export const updateStoreStatus = async (req: Request, res: Response): Promise<Response> => {
    const { active, storeId } = req.body;
    const userId = req.user.userId

    try {
        const store = await Store.findOne({ _id: storeId, userId: userId })
        if (!store) {
            return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: `No store found for ${storeId} or access denied`, success: false });
        }
        const updateStoreResult = await Store.findByIdAndUpdate({ _id: storeId }, { active: active })
        if (updateStoreResult) {
            return res.status(CREATED).json({ status: CREATED, message: 'Store status updated', success: true });
        }
    } catch (error) {
        return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: error, success: false });
    }

}

export const getAllStores = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = await Store.find({})
        if (res) {
            return res.status(SUCCESS).json({ status: SUCCESS, message: 'sccess', success: true, payload: result });
        }
    } catch (error) {
        return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: error, success: false });
    }
}


export const getSingleStoreById = async (req: Request, res: Response) => {
    const { storeId } = req.params
    Store.findById({ _id: storeId }, async (err: unknown, data: CreateStoreIProps) => {
        if (data === null || !data) {
            return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: `Store id ${storeId} not found`, success: false });
        } else if (!data.active) {
            return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: `${data.storeName} store is deactivated`, success: false });
        } else if (err) {
            return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: err, success: false });
        }
        else {
            return res.status(SUCCESS).json({ status: SUCCESS, message: 'Product updated', success: true, payload: data });
        }
    })
}
