import { Request, Response, NextFunction } from 'express';
import Category from '../../models/Category';
import { CategoriesIProps } from '../../types/product';
import { SUCCESS, CREATED, SERVER_ERROR, BAD_REQUEST } from '../../utils/statusCode';

export const createCategory = async (req: Request, res: Response) => {
    const name: string = req.body.name
    const nameVal = name.toUpperCase()
    try {
        const result = await Category.create({ name: nameVal })
        if (result) {
            return res.status(CREATED).json({ status: CREATED, message: 'Category created', success: true, payload: result });
        }
    } catch (error) {
        return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: error, success: false });
    }

}

export const updateCategory = (req: Request, res: Response) => {
    const name: string = req.body.name
    const categoryId = req.body.categoryId
    const nameVal = name.toUpperCase()
    const userId = req.user.userId
    Category.findOneAndUpdate({ _id: categoryId, userId: userId }, { name: nameVal }, async (err: unknown, data: unknown) => {
        if (data === null || !data) {
            return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: `category id ${categoryId} not found or access denied`, success: false });
        } else if (err) {
            return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: err, success: false });
        } else {
            let result = await Category.find({})
            return res.status(SUCCESS).json({ status: SUCCESS, message: 'Category updated', success: true, payload: result });
        }
    })
}


export const getAllCategory = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = await Category.find({})
        if (res) {
            return res.status(SUCCESS).json({ status: SUCCESS, message: 'sccess', success: true, payload: result });
        }
    } catch (error) {
        return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: error, success: false });
    }
}