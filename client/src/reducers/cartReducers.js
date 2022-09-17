import Cart from '../constants/cart';

const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
    
    switch (action.type) {
        case Cart.ADD_TO_CART:
            const item = action.payload;
            const itemExists = state.cartItems.find(i => i.id === item.id);

            if (itemExists) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.id === itemExists.id ? item : i)
                };
            }
            else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                }
            }

        case Cart.REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(i => i.id !== action.payload)
            };

        case Cart.SAVE_SHIPPING_INFO: 
            return {
                ...state,
                shippingInfo: action.payload
            }
        default: return state;
    }
};

export default cartReducer;

