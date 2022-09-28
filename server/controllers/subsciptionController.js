import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import Subscription from "../models/subscriptionModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import successHandler from "../utils/successHandler.js";
import messageHandler from "../utils/messageHandler.js";
import sendEmail from "../utils/sendEmail.js";

const {
    SUBSCRIPTION_CREATE,
    SUBSCRIPTIONS_LENGTH,
    SUBSCRIPTION_NOT_FOUND,
    SUBSCRIBTION_UPDATE,
    SUBSCRIBTION_DELETE,
    NEWSLETTERS_SENT,
} = messageHandler.subscriptionMessages;

const newSubscription = catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body;
    const subscription = await Subscription.create({ email });

    successHandler(res, 200, subscription, SUBSCRIPTION_CREATE);
});

const getSubscriptions = catchAsyncErrors(async (req, res, next) => {
    const subscriptions = await Subscription.find();

    successHandler(res, 200, subscriptions, SUBSCRIPTIONS_LENGTH(subscriptions.length));
});

const deleteSubscription = catchAsyncErrors(async (req, res, next) => {
    const subscription = await Subscription.findOneAndDelete(req.body.email)

    if (!subscription) {
        return next(new ErrorHandler(SUBSCRIPTION_NOT_FOUND(req.email),404));
    }

    successHandler(res, 200, subscription, SUBSCRIBTION_DELETE);
});

const sendNewsLetter = catchAsyncErrors(async (req, res, next) => {
    const subscriptions = await Subscription.find();
    const emails = [];

    subscriptions.forEach(sub => {
        emails.push(sub.email);

        try {
             sendEmail({
                email: sub.email,
                subject: "Monthly newsletter",
                message: req.body.message
            })
        }

        catch (err) {
            return next(new ErrorHandler(err.message, 500));
        }
    });

    successHandler(res, 200, emails, NEWSLETTERS_SENT);
});

const subscribersController = {
    newSubscription,
    getSubscriptions,
    deleteSubscription,
    sendNewsLetter,
};

export default subscribersController; 