import express from 'express';
import orderController from '../controllers/orderController.js';
import { isAuthenticatedUser, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

const user = isAuthenticatedUser;
const admin = [isAuthenticatedUser, authorizeRoles('admin')];

const {
    newOrder,
    getUserOrders,
    getAllOrders,
    getOrder,
    updateOrder,
    deleteOrder,
} = orderController;

//User
router.route('/order/new').post(user, newOrder);
router.route('/order/:id').get(user, getOrder);
router.route('/orders').get(user, getUserOrders);

//Admin
router.route('/admin/orders').get(admin, getAllOrders);
router.route('/admin/order/:id')
    .put(admin, updateOrder)
    .delete(admin, deleteOrder);




export default router;