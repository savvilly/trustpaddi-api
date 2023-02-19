import { Request, Response } from 'express';
import Store from '../../models/Store';
import { NOT_CREATED, CREATED, SERVER_ERROR } from '../../utils/statusCode';
import { CreateStoreIProps } from '../../types/store';

export const createStore = async (req: Request, res: Response) => {
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