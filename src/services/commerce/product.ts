import { Request, Response, NextFunction } from 'express';
import Product from '../../models/Product';
import { SUCCESS, CREATED, SERVER_ERROR, BAD_REQUEST } from '../../utils/statusCode';
import { CreateProductIProps } from '../../types/product';

export const createProduct = async (req: Request, res: Response) => {
    const { name, category, price, description, address, city, state, contact, image, userId, storeId, draft, inStock } = req.body;
    const newProduct: CreateProductIProps = {
        storeId, name, category, price, description, address, city, state, contact, image, userId, draft, inStock
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

export const updateProduct = (req: Request, res: Response) => {
    const { name, category, price, description, address, city, state, contact, image, userId,  draft, inStock, productId } = req.body;
    const editedProduct: CreateProductIProps = {
      name, category, price, description, address, city, state, contact, image, userId, draft, inStock
    }
    Product.findOneAndUpdate({ _id: productId }, editedProduct, async (err: unknown, data: unknown) => {
        if (data === null || !data) {
            return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: `product id ${productId} not found`, success: false });
        } else if (err) {
            return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: err, success: false });
        } else {
            let result = await Product.find({})
            return res.status(SUCCESS).json({ status: SUCCESS, message: 'Product updated', success: true, payload: result });
        }
    })
}

export const getAllProductsVendor = async (req: Request, res: Response) => {
    const { storeId } = req.params
    try {
        const result = await Product.find({ storeId: storeId })
        if (result) {
            return res.status(SUCCESS).json({ status: SUCCESS, message: 'ok', success: true, payload: result });
        }
    } catch (error) {
        return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: error, success: false });
    }
}

export const getAllProductUser   = async (req: Request, res: Response) => {
    const { storeId } = req.params
    try {
        const result = await Product.find({ storeId })
        if (result) {
            return res.status(SUCCESS).json({ status: SUCCESS, message: 'ok', success: true, payload: result });
        }
    } catch (error) {
        return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: error, success: false });
    }
}

export const getSingleProductById = async (req: Request, res: Response) => {
    const { productId } = req.params
    Product.findById({ _id: productId }, async (err: unknown, data: unknown) => {
        if (data === null || !data) {
            return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: `product id ${productId} not found`, success: false });
        } else if (err) {
            return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: err, success: false });
        } else {
            return res.status(SUCCESS).json({ status: SUCCESS, message: 'Product updated', success: true, payload: data });
        }
    })
}

export const deleteProduct = (req: Request, res: Response) => {
    const { productId } = req.params
    Product.findOneAndDelete({ _id: productId }, async (err: unknown, data: unknown) => {
        if (data === null || !data) {
            return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: `product id ${productId} not found`, success: false });
        } else if (err) {
            return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: err, success: false });
        } else {
            let result = await Product.find({})
            return res.status(SUCCESS).json({ status: SUCCESS, message: 'Product deleted', success: true, payload: result });
        }
    })
}

export const transferProductToStore = (req: Request, res: Response) => {
    const { productId, storeId } = req.body
    Product.findOneAndUpdate({ _id: productId }, { storeId: storeId }, (err: unknown, data: unknown) => {
        if (data === null || !data) {
            return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: `No product found for ${productId}`, success: false });
        } else if (err) {
            return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: err, success: false });
        } else {
            return res.status(SUCCESS).json({ status: SUCCESS, message: 'Product transferred', success: true });
        }
    })
}

