import express from 'express';
import subsriptionController from '../controllers/subsciptionController.js';
import { authorizeRoles, isAuthenticatedUser } from '../middleware/auth.js';

const router = express.Router();

const admin = [isAuthenticatedUser, authorizeRoles("admin")];

const {
    getSubscriptions,
    newSubscription,
    deleteSubscription,
    sendNewsLetter,

}
    = subsriptionController;


router.route("/subscriptions").get(admin, getSubscriptions);
router.route("/subscription").post(newSubscription);
router.route("/subscription").delete(deleteSubscription);
router.route("/subscription/newsletter").post(admin, sendNewsLetter);

export default router;
