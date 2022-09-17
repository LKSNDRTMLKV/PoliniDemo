import Cart from "../constants/cart";
import productServices from "../services/productServices";
import localStorageHelper from "../helpers/localStorageHelper";
import Storage from "../constants/storage";

const addItemsToCart = (id,quantity,size) => async (dispatch, getState) => {
    const { data } = await productServices.getProduct(id);

    dispatch({
        type: Cart.ADD_TO_CART,
        payload: {
            id: data.product._id,
            name: data.product.name,
            price: data.product.discount > 0 ? data.product.price - ((data.product.price / 100) * data.product.discount) : data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity,
            size
        },
    });
    localStorageHelper.saveItem(Storage.CART_ITEMS, getState().cart.cartItems);
};

const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: Cart.REMOVE_CART_ITEM,
        payload: id,
    });

    localStorageHelper.saveItem(Storage.CART_ITEMS,  getState().cart.cartItem);
};

const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: Cart.SAVE_SHIPPING_INFO,
        payload: data,
    });

    localStorageHelper.saveItem(Storage.SHIPPING_INFO, data);
}

const CartActions = {
    addItemsToCart,
    removeFromCart,
    saveShippingInfo,
}

export default CartActions;
