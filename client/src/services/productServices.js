import axios from "axios";
import API from "../constants/api/API";
import { config, withCredentials } from "../helpers/configHelper";
import { restHelper } from "../helpers/restHelper"

const getProducts = async (keyword, currentPage, price, category, brand, sex, rating) => {
    let response;
    if (category) {
        response = await axios.get
            (API.url +
                `/products?keyword=${keyword}
                &page=${currentPage}
                &price[gte]=${price[0]}
                &price[lte]=${price[1]}
                &category=${category}
                &sex=${sex}
                &rating[gte]=${rating}`)
    }

    if (brand) {
        response = await axios.get
            (API.url +
                `/products?keyword=${keyword}
                &page=${currentPage}
                &price[gte]=${price[0]}
                &price[lte]=${price[1]}
                &brand=${brand}
                &rating[gte]=${rating}`);
    }

    else {
        response = await axios.get
            (API.url +
                `/products?keyword=${keyword}
                &page=${currentPage}
                &price[gte]=${price[0]}
                &price[lte]=${price[1]}
                &rating[gte]=${rating}`);
    }
    return response;
};

const getAllProducts = async () => {
    let response = await axios.get(API.url + "/admin/products");
    return response;
};

const createProduct = async (payload) => {
    let response = await axios.post(API.url + "/admin/product/new", payload, config);
    return response;
};

const getProduct = async (id) => {
    let response = await axios.get(API.url + `/product/${id}`);
    return response;
};

const updateProduct = async (id, payload) => {
    let response = await axios.put(API.url + `/admin/product/${id}`, payload);
    return response;
};

const deleteProduct = async (id) => {
    let response = await axios.delete(API.url + `/admin/product/${id}`, withCredentials);
    return response;
};

const reviewProduct = async (payload) => {
    let response = await axios.put(API.url + `/review}`, payload);
    return response;
};

const getProductReviews = async (id) => {
    let response = await axios.get(API.url + `/reviews?id=${id}`);
    return response;
};

const deleteProductReview = async (reviewId, productId) => {
    let response = await axios.get(API.url + `/reviews?id=${reviewId}&productId=${productId}`);
    return response;
};


const productServices = {
    getProducts,
    getAllProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    reviewProduct,
    getProductReviews,
    deleteProductReview,
};

export default productServices;