import { Router } from 'express';
const commerceRouter = Router();
import checkAuth from '../middleware/checkAuth';
import { createStore, getAllStores, getSingleStoreById, editStore, updateStoreStatus } from '../services/commerce/store';
import { createProduct, updateProduct, deleteProduct, getAllProductsVendor ,getAllProductUser ,  transferProductToStore, getSingleProductByIdVendor, } from '../services/commerce/product';
import { createProductValidation, createStoreValidation, transferProductToStoreValidation, updateStoreStatusValidation, editStoreValidation } from "../middleware/validation/index"

// PRODUCT
commerceRouter.post('/vendor/create_product', checkAuth, createProductValidation, createProduct);
commerceRouter.patch('/vendor/update_product', checkAuth, createProductValidation, updateProduct);
commerceRouter.delete('/vendor/delete_product/:productId', checkAuth, deleteProduct);
commerceRouter.get('/vendor/get_store_products/:storeId',checkAuth, getAllProductsVendor );
commerceRouter.get('/user/get_store_products/:storeId',checkAuth, getAllProductUser  );
commerceRouter.get('/vendor/get_single_product/:productId', getSingleProductByIdVendor);
commerceRouter.patch('/commerce_transfer_product_to_store', checkAuth, transferProductToStoreValidation, transferProductToStore);

//STORE
commerceRouter.post('/vendor/create_store', checkAuth, createStoreValidation, createStore);
commerceRouter.get('/vendor/get_store/:storeId', getSingleStoreById);
commerceRouter.patch('/vendor/edit_store', checkAuth, editStoreValidation, editStore);
commerceRouter.patch('/admin/update_store_status', checkAuth, updateStoreStatusValidation, updateStoreStatus);
commerceRouter.get('/admin/get_all_stores',checkAuth, getAllStores);

export default commerceRouter;
