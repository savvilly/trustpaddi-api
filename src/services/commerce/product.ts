import { Request, Response } from 'express';
import Product from '../../models/Product';
import { SUCCESS, CREATED, SERVER_ERROR } from '../../utils/statusCode';
import { CreateProductIProps } from '../../types/product';

export const createProduct = async (req: Request, res: Response) => {
    const { name, category, price, description, address, city, state, contact, image, userId, storeId } = req.body;
    const newProduct: CreateProductIProps = {
        storeId, name, category, price, description, address, city, state, contact, image, userId
    }
    try {
        const result = await Product.create(newProduct)
        if (result) {
            return res.status(CREATED).json({ status: CREATED, message: 'Product created', success: true, payload: result });
        }
    } catch (error) {
        return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: error, success: false });
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    const { productId } = req.params
    const { name, category, price, description, address, city, state, contact, image, userId, storeId } = req.body;
    const editedProduct: CreateProductIProps = {
        storeId, name, category, price, description, address, city, state, contact, image, userId
    }
    try {
        const result = await Product.findOneAndUpdate({ _id: productId }, editedProduct)
        if (result) {
            return res.status(SUCCESS).json({ status: SUCCESS, message: 'Product updated', success: true, });
        }
    } catch (error) {
        return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: error, success: false });
    }
}


export const deleteProduct = async (req: Request, res: Response) => {
    const { productId } = req.params
    try {
        const result = await Product.findOneAndDelete({ _id: productId })
        if (result) {
            return res.status(SUCCESS).json({ status: SUCCESS, message: 'Product deleted', success: true, });
        }
    } catch (error) {
        return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: error, success: false });
    }
}