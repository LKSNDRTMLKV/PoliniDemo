import axios from 'axios';
import API from '../constants/api/API';
import Product from '../constants/product'

import productServices from "../services/productServices";


const getProducts = (keyword = "", currentPage = 1, price = [0, 10000], category, sex, rating = 0) => async (dispatch) => {
    try {
        dispatch({
            type: Product.ALL_PRODUCT_REQUEST
        });

        const { data } = await productServices.getProducts(keyword, currentPage, price, category, sex, rating);

        dispatch({
            type: Product.ALL_PRODUCT_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        dispatch({
            type: Product.ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};
//Admin
const getAllProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: Product.ADMIN_PRODUCT_REQUEST,
        });

        const { data } = await productServices.getAllProducts();

        dispatch({
            type: Product.ADMIN_PRODUCT_SUCCESS,
            payload: data.products,
        });

    }
    catch (error) {
        dispatch({
            type: Product.ADMIN_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

const createProduct = (payload) => async (dispatch) => {
    try {
        dispatch({ type: Product.NEW_PRODUCT_REQUEST });

        const { data } = await productServices.createProduct(payload);

        dispatch({
            type: Product.NEW_PRODUCT_SUCCESS,
            payload: data,
        });

    }
    catch (error) {
        dispatch({
            type: Product.NEW_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

const getProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: Product.PRODUCT_DETAILS_REQUEST });

        // const { data } = await axios.get(API.url + `/product/${id}`)
        const { data } = await productServices.getProduct(id);

        dispatch({
            type: Product.PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        });

    }
    catch (error) {
        dispatch({
            type: Product.PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};


const updateProduct = (id, payload) => async (dispatch) => {
    try {
        dispatch({ type: Product.UPDATE_PRODUCT_REQUEST });

        const { data } = await productServices.updateProduct(id, payload)

        dispatch({
            type: Product.UPDATE_PRODUCT_SUCCESS,
            payload: data.success,
        });

    }
    catch (error) {
        dispatch({
            type: Product.UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: Product.DELETE_PRODUCT_REQUEST });

        const { data } = await productServices.deleteProduct(id);

        dispatch({
            type: Product.DELETE_PRODUCT_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        dispatch({
            type: Product.DELETE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

const reviewProduct = (payload) => async (dispatch) => {
    try {
        dispatch({ type: Product.NEW_REVIEW_REQUEST });

        const { data } = await productServices.reviewProduct(payload);

        dispatch({
            type: Product.NEW_REVIEW_SUCCESS,
            payload: data.success,
        });
    }
    catch (error) {
        dispatch({
            type: Product.NEW_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};

const getProductReviews = (id) => async (dispatch) => {
    try {
        dispatch({ type: Product.ALL_REVIEW_REQUEST });

        const { data } = await productServices.getProductReviews(id);

        dispatch({
            type: Product.ALL_REVIEW_SUCCESS,
            payload: data.reviews,
        });
    }
    catch (error) {
        dispatch({
            type: Product.ALL_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};

const deleteProductReview = (reviewId, productId) => async (dispatch) => {
    try {
        dispatch({ type: Product.DELETE_REVIEW_REQUEST });

        const { data } = await productServices.deleteProductReview(reviewId, productId);

        dispatch({
            type: Product.DELETE_REVIEW_SUCCESS,
            payload: data.success,
        });
    }
    catch (error) {
        dispatch({
            type: Product.DELETE_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};

const clearErrors = () => async (dispatch) => {
    dispatch({
        type: Product.CLEAR_ERRORS,
    })
}

const productActions = {
    getProducts,
    getAllProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    reviewProduct,
    getProductReviews,
    deleteProductReview,
    clearErrors,
}

export default productActions;
