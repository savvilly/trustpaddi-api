import checkAuth from '../middleware/checkAuth';
import { createProduct, updateProduct, deleteProduct, getAllProducts, transferProductToStore } from '../services/commerce/product';
import { createStore } from '../services/commerce/store';
import { Router } from 'express';
const commerceRouter = Router();
import { createProductValidation, createStoreValidation, transferProductToStoreValidation } from "../middleware/validation/index"

commerceRouter.post('/commerce_create_product', checkAuth, createProductValidation, createProduct);
commerceRouter.put('/commerce_update_product/:productId', checkAuth, createProductValidation, updateProduct);
commerceRouter.delete('/commerce_delete_product/:productId', checkAuth, deleteProduct);
commerceRouter.post('/commerce_create_store', checkAuth, createStoreValidation, createStore);
commerceRouter.get('/commerce_create_store_products/:storeId', checkAuth, getAllProducts);
commerceRouter.patch('/commerce_transfer_product_to_store', checkAuth, transferProductToStoreValidation, transferProductToStore);

export default commerceRouter;
