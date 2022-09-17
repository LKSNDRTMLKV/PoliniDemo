import axios from "axios";
import User from "../constants/user";
import { config } from "../helpers/configHelper";
import userServices from "../services/userServices";

const login = (payload) => async (dispatch) => {
    try {
        dispatch({ type: User.LOGIN_REQUEST });

        const { data } = await userServices.login(payload);

        dispatch({ type: User.LOGIN_SUCCESS, payload: data.user });
    }
    catch (error) {
        dispatch({ type: User.LOGIN_FAIL, payload: error.response.data.message});
    }
};

const register = (payload) => async (dispatch) => {
    try {
        dispatch({ type: User.REGISTER_USER_REQUEST });

        const { data } = await userServices.register(payload);

        dispatch({ type: User.REGISTER_USER_SUCCESS, payload: data.user });
    }
    catch (error) {
        dispatch({
            type: User.REGISTER_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};


const getAccount = () => async (dispatch) => {
    try {
        dispatch({ type: User.LOAD_USER_REQUEST });

        const { data } = await userServices.getAccount();

        dispatch({ type: User.LOAD_USER_SUCCESS, payload: data.user });
    }
    catch (error) {
        dispatch({ type: User.LOAD_USER_FAIL, payload: error.response.data.message });
    }
};

const logout = () => async (dispatch) => {
    try {
        await userServices.logout();

        dispatch({ type: User.LOGOUT_SUCCESS });
    }
    catch (error) {
        dispatch({ type: User.LOGOUT_FAIL, payload: error.response.data.message });
    }
};


const updateAccount = (payload) => async (dispatch) => {
    try {
        dispatch({ type: User.UPDATE_ACCOUNT_REQUEST });

        const { data } = userServices.updateAccount(payload);

        dispatch({ type: User.UPDATE_ACCOUNT_SUCCESS, payload: data});
    }
    catch (error) {
        dispatch({
            type: User.UPDATE_ACCOUNT_FAIL,
            payload: error.response.data.message,
        });
    }
};

const updatePassword = (payload) => async (dispatch) => {
    try {
        dispatch({ type: User.UPDATE_PASSWORD_REQUEST });

        // const { data } = userServices.updatePassword(payload);
        const { data } = axios.put(`http://localhost:4000/password/update`, payload, {withCredentials:true});

        dispatch({ type: User.UPDATE_PASSWORD_SUCCESS, payload: data});
    }
    catch (error) {
        dispatch({
            type: User.UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};

const forgotPassword = (payload) => async (dispatch) => {
    try {
        dispatch({ type: User.FORGOT_PASSWORD_REQUEST });

        const { data } = await userServices.forgotPassword(payload);

        dispatch({ type: User.FORGOT_PASSWORD_SUCCESS, payload: data.message });
    }
    catch (error) {
        dispatch({
            type: User.FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};

const resetPassword = (token, payload) => async (dispatch) => {
    try {
        dispatch({ type: User.RESET_PASSWORD_REQUEST });

        const { data } = await userServices.resetPassword(token, payload)

        dispatch({ type: User.RESET_PASSWORD_SUCCESS, payload: data.success });
    }
    catch (error) {
        dispatch({
            type: User.RESET_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};

const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: User.ALL_USERS_REQUEST });
        const { data } = await userServices.getAllUsers();

        dispatch({ type: User.ALL_USERS_SUCCESS, payload: data.users });
    }
    catch (error) {
        dispatch({ type: User.ALL_USERS_FAIL, payload: error.response.data.message });
    }
};

const getUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: User.USER_DETAILS_REQUEST });
        const { data } = await userServices.getUser(id);

        dispatch({ type: User.USER_DETAILS_SUCCESS, payload: data.user });
    }
    catch (error) {
        dispatch({ type: User.USER_DETAILS_FAIL, 
            payload: error.response.data.message });
    }
};

const updateUser = (id, payload) => async (dispatch) => {
    try {
        dispatch({ type: User.UPDATE_USER_REQUEST });

        const { data } = await userServices.updateUser(id, payload)

        dispatch({ type: User.UPDATE_USER_SUCCESS, payload: data.success });
    }
    catch (error) {
        dispatch({
            type: User.UPDATE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: User.DELETE_USER_REQUEST });

        const { data } = await userServices.deleteUser(id);

        dispatch({ type: User.DELETE_USER_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({
            type: User.DELETE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};
const deleteAccount = () => async (dispatch) => {
    try {
        dispatch({ type: User.DELETE_USER_REQUEST });

        const { data } = await userServices.deleteAccount();

        dispatch({ type: User.DELETE_USER_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({
            type: User.DELETE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

const clearErrors = () => async (dispatch) => {
    dispatch({ type: User.CLEAR_ERRORS });
};

const userActions = {
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
    deleteUser,
    deleteAccount,
    clearErrors,
}

export default userActions;