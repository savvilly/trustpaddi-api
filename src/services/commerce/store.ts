import { Request, Response } from 'express';
import Store from '../../models/Store';
import { NOT_CREATED, CREATED, SERVER_ERROR, BAD_REQUEST, SUCCESS } from '../../utils/statusCode';
import { CreateStoreIProps } from '../../types/store';

export const createStore = async (req: Request, res: Response): Promise<Response> => {
    const { storeName, logo, userId } = req.body;
    const newStore: CreateStoreIProps = {
        storeName, logo, userId
    }
    try {
        const result = await Store.create(newStore)
        if (result) {
            return res.status(CREATED).json({ status: CREATED, message: 'Store created', success: true, payload: result });
        }
    } catch (error) {
        return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: error, success: false });
    }
}

export const getAllStores = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = await Store.find({})
        if (res) {
            return res.status(CREATED).json({ status: CREATED, message: 'Store created', success: true, payload: result });
        }
    } catch (error) {
        return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: error, success: false });
    }
}


export const getSingleStoreById = async (req: Request, res: Response) => {
    const { storeId } = req.params
    Store.findById({ _id: storeId }, async (err: unknown, data: unknown) => {
        if (data === null || !data) {
            return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: `Store id ${storeId} not found`, success: false });
        } else if (err) {
            return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: err, success: false });
        } else {
            return res.status(SUCCESS).json({ status: SUCCESS, message: 'Product updated', success: true, payload: data });
        }
    })
}
