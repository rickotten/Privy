import axios from 'axios';
import { returnErrors } from './errors';

import { 
    USER_PROFILES_GET_LOADING,
    USER_PROFILES_GET_SUCCESS,
    USER_PROFILES_GET_FAILURE
 } from "./types";



//// GET PROFILES OF USERS WITH SIMILAR NAMES
export const get_name_profile_data = (username) => dispatch => {
    dispatch({ type: USER_PROFILES_GET_LOADING });

    axios.get('/searchname/?search=${username}')
        .then(res => {
            dispatch({
                type: USER_PROFILES_GET_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: USER_PROFILES_GET_FAILURE,
            })
        });
    }

// GET PROFILES OF USERS WITH SIMILAR EMAILS
export const get_email_profile_data = (email) => dispatch => {
    dispatch({ type: USER_PROFILES_GET_LOADING });

    axios.get('/searchemail/?search=${username}')
        .then(res => {
            dispatch({
                type: USER_PROFILES_GET_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: USER_PROFILES_GET_FAILURE,
            })
        });
    }