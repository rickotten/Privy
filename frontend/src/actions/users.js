import axios from 'axios';
import { returnErrors } from './errors';

import { 
    USER_PROFILES_GET_LOADING,
    USER_PROFILES_GET_SUCCESS,
    USER_PROFILES_GET_FAILURE,
 } from "./types";

// GET PROFILES OF USERS WITH SIMILAR EMAILS OR NAMES
export const get_user_profile_data = (words) => dispatch => {
    dispatch({ type: USER_PROFILES_GET_LOADING });

    axios.get('/searchuser/?search=${words}')
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

// GET PROFILES OF USERS WITH FRIENDS OF FRIENDS
export const get_fof_profile_data = (username) => dispatch => {
    dispatch({ type: USER_PROFILES_GET_LOADING });

    axios.get('/searchfriendsoffriends/${username}')
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
