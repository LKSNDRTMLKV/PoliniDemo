import Product from '../constants/product';


 const productsReducer = (state = { products: [] }, action) => {

    switch (action.type) {
        case Product.ALL_PRODUCT_REQUEST:
        case Product.ADMIN_PRODUCT_REQUEST:
            return {
                loading: true,
                product: [],
            };
        case Product.ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resultPerPage: action.payload.resultPerPage,
                paginationCount: action.payload.paginationCount,
                filteredProductsCount: action.payload.filteredProductsCount,
            };
        case Product.ADMIN_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload,
            };
        case Product.ALL_PRODUCT_FAIL:
        case Product.ADMIN_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case Product.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
};

 const newProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case Product.NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case Product.NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                product: action.payload.product,
            };
        case Product.NEW_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case Product.NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false,
            };
        case Product.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

 const productReducer = (state = {}, action) => {
    switch (action.type) {
        case Product.DELETE_PRODUCT_REQUEST:
        case Product.UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case Product.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };

        case Product.UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case Product.DELETE_PRODUCT_FAIL:
        case Product.UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case Product.DELETE_PRODUCT_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case Product.UPDATE_PRODUCT_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        case Product.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

 const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case Product.PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
            };
        case Product.PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload,
            };
        case Product.PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case Product.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

 const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case Product.NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case Product.NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload,
            };
        case Product.NEW_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case Product.NEW_REVIEW_RESET:
            return {
                ...state,
                success: false,
            };
        case Product.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

 const productReviewsReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
        case Product.ALL_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case Product.ALL_REVIEW_SUCCESS:
            return {
                loading: false,
                reviews: action.payload,
            };
        case Product.ALL_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case Product.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

 const reviewReducer = (state = {}, action) => {
    switch (action.type) {
        case Product.DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case Product.DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };
        case Product.DELETE_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case Product.DELETE_REVIEW_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case Product.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

const ProductReducers = {
    productsReducer,
    newProductReducer,
    productReducer,
    productDetailsReducer,
    newReviewReducer,
    productReviewsReducer,
    reviewReducer,
}

export default ProductReducers;