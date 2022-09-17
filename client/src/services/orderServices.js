import { restHelper } from "../helpers/restHelper"
import axios from 'axios';
import API from "../constants/api/API";

const createOrder = async (payload) => {
    let response = await axios.post(API.url + "/order/new", payload);
    return response;
};

const getOrder = async (id) => {
    let response = await axios.get(API.url + `/order/${id}`);
    return response;
};

const getUserOrders = async () => {
    let response = await axios.get(API.url + "/orders");
    return response;
};

const getAllOrders = async () => {
    let response = await axios.get(API.url + "/admin/orders", {withCredentials:true});
    return response;
};

const updateOrder = async (id,payload) => {
    let response = await axios.put(API.url + `/admin/order/${id}`, payload);
    return response;
};

const deleteOrder = async (id) => {
    let response = await axios.delete(API.url + `/admin/order${id}`);
    return response;
};

const orderServices = {
    createOrder,
    getUserOrders,
    getAllOrders,
    getOrder,
    updateOrder,
    deleteOrder,
}

export default orderServices;

