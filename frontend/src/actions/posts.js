import axios from 'axios';
import { returnErrors } from './errors';
import { tokenConfig } from './auth';

import { 
    USER_POSTS_GET_SUCESS,
    USER_POSTS_GET_FAILURE,
    USER_POSTS_GET_LOADING
 } from "./types";

// GET POSTS OF AUTHENTICATED USER
export const get_user_posts = () => (dispatch, getState) => {
    dispatch({ type: USER_POSTS_GET_LOADING });

    const config = tokenConfig(getState);
    axios.get('/api/auth/userposts', config)
        .then(res => {
            dispatch({ 
                type: USER_POSTS_GET_SUCESS,
                payload: res.data
             });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: USER_POSTS_GET_FAILURE,
            })
        });
}