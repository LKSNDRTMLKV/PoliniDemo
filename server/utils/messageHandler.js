//USERS
const REGISTER = "Registered successfully";
const LOGIN = "Logged in successfully";
const LOGOUT = "Logged out successfully";
const PASSWORD_EMAIl = "Please provide email and password";
const INVALID_EMAIL = "Email is invalid";
const INVALID_PASSWORD = "Password is invalid";
const ACCOUNT_UPDATE = "Account updated successfully";
const ACCOUNT_DELETE = "Account deleted successfully";
const USERS_FOUND = "Users found successfully";
const USER_FOUND = "User found successfully";
const USER_NOT_FOUND = (id) => `User with id ${id} not found`;
const USER_UPDATE = "User updated successfully";
const USER_DELETE = "User deleted successfully";
const PASSWORD_RESET_TOKEN = url => `Your password reset token is :- \n\n ${url} \n\n If you have not requested this email then please ignore this message`;
const EMAIL_SENT = email => `Email sent to ${email}`;
const INVALID_PASSWORD_RESET = "Reset password token is invalid or expired";
const PASSWORD_RESET = "Password reset done successfully";
const PASSWORD_OLD = "Old password is incorrect";
const PASSWORD_NEW_OLD = "Your new password cannot be your old password";
const PASSWORD_NOT_MATCH = "Password do not match";
const PASSWORD_UPDATE = "Password updated successfully";

const userMessages = {
    REGISTER,
    LOGIN,
    LOGOUT,
    PASSWORD_EMAIl,
    INVALID_EMAIL,
    INVALID_PASSWORD,
    ACCOUNT_UPDATE,
    ACCOUNT_DELETE,
    USERS_FOUND,
    USER_FOUND,
    USER_NOT_FOUND,
    USER_UPDATE,
    USER_DELETE,
    PASSWORD_RESET_TOKEN,
    EMAIL_SENT,
    INVALID_PASSWORD_RESET,
    PASSWORD_RESET,
    PASSWORD_OLD,
    PASSWORD_NEW_OLD,
    PASSWORD_NOT_MATCH,
    PASSWORD_UPDATE,
};


//PRODUCTS
const PRODUCT_CREATE = "Product created successfully";
const PRODUCT_NOT_FOUND = id => `Product with id ${id} not found`;
const PRODUCT_FOUND = "Product found successfully";
const PRODUCTS_FOUND = "Products found successfully";
const PRODUCT_LENGTH = length => `There are ${length} products currently`;
const PRODUCT_UPDATE = "Product updated successfully";
const PRODUCT_DELETE = "Product deleted successfully";
const REVIEW = "Review done successfully";
const REVIEW_LENGTH = length => `There are ${length} reviews for this product`;
const REVIEW_DELETE = "Review deleted successfully";

const productMessages = {
    PRODUCT_CREATE,
    PRODUCT_FOUND,
    PRODUCT_NOT_FOUND,
    PRODUCT_LENGTH,
    PRODUCT_UPDATE,
    PRODUCT_DELETE,
    REVIEW,
    REVIEW_LENGTH,
    REVIEW_DELETE
};


//ORDERS
const ORDER_CREATE = "Order created successfully";
const ORDERS_LENGTH = length => `There are ${length} orders currently`;
const ORDERS_NONE = "You have no orders";
const ORDER_FOUND = "Order found successfully";
const ORDER_DELIVERED = "This order has already been delivered";
const ORDER_NOT_FOUND = id => `Order with id ${id} not found`;
const ORDER_UPDATE = "Order updated successfully";
const ORDER_DELETE = "Order deleted successfully";

const orderMessages = {
ORDER_CREATE,
ORDERS_LENGTH,
ORDERS_NONE,
ORDER_FOUND,
ORDER_DELIVERED,
ORDER_NOT_FOUND,
ORDER_UPDATE,
ORDER_DELETE
};


//SUBSCRIPTIONS
const SUBSCRIPTION_CREATE = "Subscription created successfully";
const SUBSCRIPTIONS_LENGTH = length => `There are ${length} subscriptions`;
const SUBSCRIPTION_NOT_FOUND = "That email is not subscribed";
const SUBSCRIBTION_UPDATE = "Subscription updated successfully";
const SUBSCRIBTION_DELETE = "Subscription deleted successfully";
const NEWSLETTERS_SENT = "Newsletters sent successfully";

const subscriptionMessages = {
    SUBSCRIPTION_CREATE,
    SUBSCRIPTIONS_LENGTH,
    SUBSCRIPTION_NOT_FOUND,
    SUBSCRIBTION_UPDATE,
    SUBSCRIBTION_DELETE,
    NEWSLETTERS_SENT,
};

const messageHandler = {
    productMessages,
    userMessages,
    orderMessages,
    subscriptionMessages,
}

export default messageHandler;