import axios from 'axios';
import { returnErrors } from './errors';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    GOOGLE_OAUTH_FAILURE,
    GOOGLE_OAUTH_SUCCESS,
    GOOGLE_OAUTH_INIT_FAILURE,
    FACEBOOK_OAUTH_FAILURE,
    FACEBOOK_OAUTH_SUCCESS,
    FORGOT_SUCCESS,
    FORGOT_FAIL
} from './types';

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    const config = tokenConfig(getState);
    axios.get('/api/auth/user', config)
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR,
            })
        });
}

export const facebook_oauth = (access_token) => (dispatch) => {
    // Headers 
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    // Request Body
    const body = JSON.stringify({ access_token });

    axios.post('/social/facebook/', body, config)
        .then(res => {
            dispatch({
                type: FACEBOOK_OAUTH_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: FACEBOOK_OAUTH_FAILURE,
            });
        })
}

// GOOGLE OAUTH TO REGISTER/LOGIN USER
export const google_oauth = (access_token) => (dispatch) => {
    // Headers 
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    // Request Body
    const body = JSON.stringify({access_token});

    console.log(access_token);
    if (access_token == null) {
        dispatch({
            type: GOOGLE_OAUTH_INIT_FAILURE
        });
        return;
    }

    axios.post('/social/google-oauth2/', body, config)
        .then(res => {
            dispatch({
                type: GOOGLE_OAUTH_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: GOOGLE_OAUTH_FAILURE,
            });
        })
}

// LOGIN USER
export const login = (username, password) => (dispatch) => {
    // Headers 
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    // Request Body
    const body = JSON.stringify({ username, password });

    axios.post('/api/auth/login', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: LOGIN_FAIL,
            });
        });
}

// REGISTER USER
export const register = ({ username, password, email }) => (dispatch) => {
    // Headers 
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    // Request Body
    const body = JSON.stringify({ username, email, password });

    axios.post('/api/auth/register', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: REGISTER_FAIL,
            })
        });
}

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
    const config = tokenConfig(getState);
    axios.post('/api/auth/logout', null, config)
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
}

// Setup config with Token Auth
export const tokenConfig = getState => {
    //  Get token from state
    const token = getState().auth.token;

    // Headers 
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    // If token, add to headers config
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
}

// FORGOT CREDENTIALS
export const forgot = (email) => (dispatch) => {
    // Headers 
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    // Request Body
    const body = JSON.stringify({ email });

    axios.post('/api/auth/forgot', body, config)
        .then(res => {
            dispatch({
                type: FORGOT_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: FORGOT_FAIL,
            })
        });
}