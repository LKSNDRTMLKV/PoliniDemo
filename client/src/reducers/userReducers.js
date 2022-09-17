import User from '../constants/user';

const userReducer = (state = { user: {}, loading: null }, action) => {
    switch (action.type) {
        case User.LOGIN_REQUEST:
        case User.REGISTER_USER_REQUEST:
        case User.LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            };
        case User.LOGIN_SUCCESS:
        case User.REGISTER_USER_SUCCESS:
        case User.LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };

        case User.LOGOUT_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false,
            };
        case User.LOGIN_FAIL:
        case User.REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };

        case User.LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };

        case User.LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case User.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

const accountReducer = (state = {}, action) => {
    switch (action.type) {
        case User.UPDATE_ACCOUNT_REQUEST:
        case User.UPDATE_PASSWORD_REQUEST:
        case User.UPDATE_USER_REQUEST:
        case User.DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case User.UPDATE_ACCOUNT_SUCCESS:
        case User.UPDATE_PASSWORD_SUCCESS:
        case User.UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: true,
                message:"Account updated successfully"
                // message:action.payload.message
            };

        case User.DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success,
                message: action.payload.message,
            };

        case User.UPDATE_ACCOUNT_FAIL:
        case User.UPDATE_PASSWORD_FAIL:
        case User.UPDATE_USER_FAIL:
        case User.DELETE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case User.UPDATE_ACCOUNT_RESET:
        case User.UPDATE_PASSWORD_RESET:
        case User.UPDATE_USER_RESET:
            return {
                ...state,
                isUpdated: false,
            };

        case User.DELETE_USER_RESET:
            return {
                ...state,
                isDeleted: false,
            };

        case User.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case User.FORGOT_PASSWORD_REQUEST:
        case User.RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case User.FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload,
            };

        case User.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload,
            };

        case User.FORGOT_PASSWORD_FAIL:
        case User.RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case User.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case User.ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case User.ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
            };

        case User.ALL_USERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case User.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case User.USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case User.USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };

        case User.USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case User.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

const UserReducers = {
    userReducer,
    accountReducer,
    forgotPasswordReducer,
    allUsersReducer,
    userDetailsReducer,
}

export default UserReducers;