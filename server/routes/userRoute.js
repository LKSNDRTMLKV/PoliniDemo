import express from 'express';
import userController from '../controllers/userController.js';
import { isAuthenticatedUser, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

const user = isAuthenticatedUser;
const admin = [isAuthenticatedUser, authorizeRoles('admin')];

const {
    reqisterUser,
    loginUser,
    logoutUser,
    updateUser,
    deleteAccount,
    getUser,
    forgotPassword,
    resetPassword,
    updatePassword,
    getAllUsers,
    getAccount,
    updateAccount,
    deleteUser,
}
    = userController;

//USERS
router.route('/register').post(reqisterUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/account').get(user, getAccount);
router.route('/account/delete').delete(user, deleteAccount)
router.route('/account/update').put(user, updateAccount);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/password/update').put(user, updatePassword);

//ADMIN
router.route('/admin/users').get(admin, getAllUsers);
router.route('/admin/user/:id')
    .get(admin, getUser)
    .put(admin, updateUser)
    .delete(admin, deleteUser);

export default router;