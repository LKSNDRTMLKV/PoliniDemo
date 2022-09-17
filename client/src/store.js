import { createStore, combineReducers, applyMiddleware, } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import ProductReducers from './reducers/productReducers';
import UserReducers from './reducers/userReducers';
import OrderReducers from './reducers/orderReducers';
import cartReducer from './reducers/cartReducers';
import localStorageHelper from './helpers/localStorageHelper';
import Storage from './constants/storage';

const reducer = combineReducers({
    products: ProductReducers.productsReducer,
    newProduct: ProductReducers.newProductReducer,
    product: ProductReducers.productReducer,
    productDetails: ProductReducers.productDetailsReducer,
    newReview: ProductReducers.newReviewReducer,
    productReviews: ProductReducers.productReviewsReducer,
    review: ProductReducers.reviewReducer,
    user: UserReducers.userReducer,
    account: UserReducers.accountReducer,
    forgotPassword: UserReducers.forgotPasswordReducer,
    allUsers: UserReducers.allUsersReducer,
    userDetails: UserReducers.userDetailsReducer,
    newOrder: OrderReducers.newOrderReducer,
    myOrders: OrderReducers.myOrdersReducer,
    allOrders: OrderReducers.myOrdersReducer,
    order: OrderReducers.orderReducer,
    orderDetails: OrderReducers.orderDetailsReducer,
    cart: cartReducer,
});

let initialState = {
    cart: {
        cartItems: localStorageHelper.exists(Storage.CART_ITEMS) ?
            localStorageHelper.getItem(Storage.CART_ITEMS) : [],
        shippingInfo: localStorageHelper.exists(Storage.SHIPPING_INFO) ?
            localStorageHelper.getItem(Storage.SHIPPING_INFO) : {}
    }
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;