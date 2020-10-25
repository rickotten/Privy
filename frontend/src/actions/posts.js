import axios from 'axios';
import { returnErrors } from './errors';
import { tokenConfig } from './auth';

import { 
    USER_POSTS_CREATE_SUCCESS,
    USER_POSTS_CREATE_FAILURE,
    USER_POSTS_GET_SUCESS,
    USER_POSTS_GET_FAILURE,
    USER_POSTS_GET_LOADING,
    UPDATE_USER_POST_FAILURE,
    UPDATE_USER_POST_SUCCESS
 } from "./types";

//CREATE A USER POST maybe done?
export const create_user_post = (text_post) => (dispatch, getState)  => {
    const config = tokenConfig(getState);
    const body = JSON.stringify(text_post);

    //maybe change axios states?
    //axios.post(`/api/auth/userposts/${post.id}`, body, config)
    axios.post(`/api/auth/posts`, text_post, config)
        .then(res => {
            dispatch({
                type: USER_POSTS_CREATE_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: USER_POSTS_CREATE_FAILURE,
            })
        });
}

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

// PUT REQUEST UPDATE USER POST
export const update_user_post = (post) => (dispatch, getState) => {
    const config = tokenConfig(getState);
    const body = JSON.stringify(post);

    axios.put(`/api/auth/userposts/${post.id}`, body, config)
        .then(res => {
            dispatch({
                type: UPDATE_USER_POST_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: UPDATE_USER_POST_FAILURE,
            })
        });
    
}