import { Router } from 'express';
const commerceRouter = Router();
import checkAuth from '../middleware/checkAuth';
import { createStore, getAllStores, getSingleStoreById, editStore, updateStoreStatus } from '../services/commerce/store';
import { createProduct, updateProduct, deleteProduct, getAllProductsVendor, getAllProductUser, transferProductToStore, getSingleProductByIdVendor, getSingleProductByIdUser, setProductStockStatus, setProductDraft } from '../services/commerce/product';
import { createProductValidation, createStoreValidation, updateProductDraftValidation, updateStoreStatusValidation, editStoreValidation, updateProductStatusValidation } from "../middleware/validation/index"

// PRODUCT USER
commerceRouter.get('/user/get_store_products/:storeId', checkAuth, getAllProductUser);
commerceRouter.get('/user/get_single_product/:productId', getSingleProductByIdUser);

// PRODUCT VENDOR
commerceRouter.post('/vendor/create_product', checkAuth, createProductValidation, createProduct);
commerceRouter.patch('/vendor/update_product', checkAuth, createProductValidation, updateProduct);
commerceRouter.delete('/vendor/delete_product/:productId', checkAuth, deleteProduct);
commerceRouter.get('/vendor/get_store_products/:storeId', checkAuth, getAllProductsVendor);
commerceRouter.get('/vendor/get_single_product/:productId', checkAuth, getSingleProductByIdVendor);
commerceRouter.patch('/vendor/upadte_product_instock_status', checkAuth, updateProductStatusValidation, setProductStockStatus);
commerceRouter.patch('/vendor/upadte_product_draft', checkAuth, updateProductDraftValidation, setProductDraft);

//STORE VENDOR
commerceRouter.post('/vendor/create_store', checkAuth, createStoreValidation, createStore);
commerceRouter.get('/vendor/get_store/:storeId', checkAuth, getSingleStoreById);
commerceRouter.patch('/vendor/edit_store', checkAuth, editStoreValidation, editStore);


//STORE ADMIN
commerceRouter.patch('/admin/update_store_status', checkAuth, updateStoreStatusValidation, updateStoreStatus);
commerceRouter.get('/admin/get_all_stores', checkAuth, getAllStores)

export default commerceRouter;
