import Order from "../constants/order";

const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
      case Order.CREATE_ORDER_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case Order.CREATE_ORDER_SUCCESS:
        return {
          loading: false,
          order: action.payload,
        };
  
      case Order.CREATE_ORDER_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case Order.CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
   const myOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case Order.MY_ORDERS_REQUEST:
        return {
          loading: true,
        };
  
      case Order.MY_ORDERS_SUCCESS:
        return {
          loading: false,
          orders: action.payload,
        };
  
      case Order.MY_ORDERS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case Order.CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
   const allOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case Order.ALL_ORDERS_REQUEST:
        return {
          loading: true,
        };
  
      case Order.ALL_ORDERS_SUCCESS:
        return {
          loading: false,
          orders: action.payload,
        };
  
      case Order.ALL_ORDERS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case Order.CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
   const orderReducer = (state = {}, action) => {
    switch (action.type) {
      case Order.UPDATE_ORDER_REQUEST:
      case Order.DELETE_ORDER_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case Order.UPDATE_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
  
      case Order.DELETE_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case Order.UPDATE_ORDER_FAIL:
      case Order.DELETE_ORDER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case Order.UPDATE_ORDER_RESET:
        return {
          ...state,
          isUpdated: false,
        };
  
      case Order.DELETE_ORDER_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case Order.CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
   const orderDetailsReducer = (state = { order: {} }, action) => {
    switch (action.type) {
      case Order.ORDER_DETAILS_REQUEST:
        return {
          loading: true,
        };
  
      case Order.ORDER_DETAILS_SUCCESS:
        return {
          loading: false,
          order: action.payload,
        };
  
      case Order.ORDER_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case Order.CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };

  const OrderReducers = {
    newOrderReducer,
    myOrdersReducer,
    allOrdersReducer,
    orderReducer,
    orderDetailsReducer,
  };

  export default OrderReducers;