import Order from '../constants/order';
import orderServices from '../services/orderServices';


const createOrder = (payload) => async (dispatch) => {
    try {
        dispatch({ type: Order.CREATE_ORDER_REQUEST });

        const { data } = await orderServices.createOrder(payload);

        dispatch({ type: Order.CREATE_ORDER_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({
            type: Order.CREATE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};


const getUserOrders = () => async (dispatch) => {
    try {
        dispatch({ type: Order.MY_ORDERS_REQUEST });

        const { data } = await orderServices.getUserOrders();

        dispatch({ type: Order.MY_ORDERS_SUCCESS, payload: data.orders });
    }
    catch (error) {
        dispatch({
            type: Order.MY_ORDERS_FAIL,
            payload: error.response.data.message,
        });
    }
};

const getAllOrders = () => async (dispatch) => {
    try {
        dispatch({ type: Order.ALL_ORDERS_REQUEST });

        const { data } = await orderServices.getAllOrders();

        dispatch({ type: Order.ALL_ORDERS_SUCCESS, payload: data.orders });
    }
    catch (error) {
        dispatch({
            type: Order.ALL_ORDERS_FAIL,
            payload: error.response.data.message,
        });
    }
};


const updateOrder = (id, payload) => async (dispatch) => {
    try {
        dispatch({ type: Order.UPDATE_ORDER_REQUEST });

       
        const { data } = await orderServices.updateOrder(id, payload);
        
        dispatch({ type: Order.UPDATE_ORDER_SUCCESS, payload: data.success });
    }
    catch (error) {
        dispatch({
            type: Order.UPDATE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};


const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch({ type: Order.DELETE_ORDER_REQUEST });

        const { data } = await orderServices.deleteOrder(id);

        dispatch({ type: Order.DELETE_ORDER_SUCCESS, payload: data.success });
    }
    catch (error) {
        dispatch({
            type: Order.DELETE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};


const getOrder = (id) => async (dispatch) => {
    try {
        dispatch({ type: Order.ORDER_DETAILS_REQUEST });

        const { data } = await orderServices.getOrder(id);

        dispatch({ type: Order.ORDER_DETAILS_SUCCESS, payload: data.order });
    }
    catch (error) {
        dispatch({
            type: Order.ORDER_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};


const clearErrors = () => async (dispatch) => {
    dispatch({ type: Order.CLEAR_ERRORS });
};

const orderActions = {
    createOrder,
    getUserOrders,
    getAllOrders,
    getOrder,
    updateOrder,
    deleteOrder,
    clearErrors
};

export default orderActions;

