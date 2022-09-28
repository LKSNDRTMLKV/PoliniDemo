import express from 'express';
import productController from '../controllers/productController.js';
import { isAuthenticatedUser, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

const user = isAuthenticatedUser;
const admin = [isAuthenticatedUser, authorizeRoles('admin')];

const {
    getProducts,
    getAllProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    reviewProduct,
    getProductReviews,
    deleteProductReview
}
    = productController;


//USERS
router.route('/products').get(getProducts);
router.route('/product/:id').get(getProduct);
router.route('/review').put(user, reviewProduct);
router.route('/reviews')
    .get(getProductReviews)
    .delete(user, deleteProductReview);

//ADMIN
router.route('/admin/products').get(admin, getAllProducts); 
router.route('/admin/product/new').post(admin, createProduct);
router.route('/admin/product/:id')
    .put(admin, updateProduct)
    .delete(admin, deleteProduct);


export default router;