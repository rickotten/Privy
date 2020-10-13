import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    GOOGLE_OAUTH_FAILURE,
    GOOGLE_OAUTH_SUCCESS,
    FACEBOOK_OAUTH_FAILURE,
    FACEBOOK_OAUTH_SUCCESS,
    FORGOT_SUCCESS,
    FORGOT_FAIL
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    accessToken: localStorage.getItem('accessToken'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        
        case FACEBOOK_OAUTH_SUCCESS:
        case GOOGLE_OAUTH_SUCCESS:
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            }
        case FACEBOOK_OAUTH_FAILURE:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
        case GOOGLE_OAUTH_FAILURE:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
        default:
            return state;
    }
}