import axios from "axios";
import { config } from "../helpers/configHelper";
import { restHelper } from "../helpers/restHelper"
import API from "../constants/api/API";



const register = async (payload) => {
    let response = await axios.post(API.url + "/register", payload, config);
    return response;
};

const login = async (payload) => {
    let response = await axios.post(API.url + "/login", payload, config);
    return response;
};

const logout = async () => {
    let response = await axios.get(API.url + "/logout", config);
    return response;
};

const getAccount = async () => {
    let response = await axios.get(API.url + "/account", config);
    return response;
};

const updateAccount = async (payload) => {
    let response = await axios.put(API.url + "/account/update", payload, config);
    return response;
};

const deleteAccount = async () => {
    let response = await axios.delete(API.url + "/account/delete", {withCredentials: true});
    return response;
}

const forgotPassword = async (payload) => {
    let response = await axios.post(API.url + "/password/forgot", payload, config);
    return response;
};

const resetPassword = async (token, payload) => {
    let response = await axios.put(API.url + `/password/reset/${token}`, payload, config);
    return response;
};

const updatePassword = async (payload) => {
    let response = await axios.put(API.url + `/password/update`, payload, config);
    return response;
};

const getAllUsers = async () => {
    let response = await axios.get(API.url + "/admin/users",{withCredentials:true});
    return response;
};

const getUser = async (id) => {
    let response = await axios.get(API.url + `/admin/user/${id}`);
    return response;
};

const updateUser = async (id, payload) => {
    let response = await axios.get(API.url + `/admin/user/${id}`, payload,);
    return response;
};

const deleteUser = async (id) => {
    let response = await axios.delete(API.url + `/admin/user/${id}`);
    return response;
};

const userServices = {
    register,
    login,
    logout,
    updateUser,
    getUser,
    forgotPassword,
    resetPassword,
    updatePassword,
    getAllUsers,
    getAccount,
    updateAccount,
    deleteAccount,
    deleteUser,
};

export default userServices;