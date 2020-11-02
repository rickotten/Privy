import axios from 'axios';
import { returnErrors } from './errors';
import { tokenConfig } from './auth';

import { 
    CREATE_USER_POST_SUCCESS,
    CREATE_USER_POST_FAILURE,
    USER_POSTS_GET_SUCESS,
    USER_POSTS_GET_FAILURE,
    USER_POSTS_GET_LOADING,
    UPDATE_USER_POST_FAILURE,
    UPDATE_USER_POST_SUCCESS
 } from "./types";

//CREATE A USER POST
export const create_user_post = (description, media) => (dispatch, getState)  => {
    const config = tokenConfig(getState);

    let form_data = new FormData();
    form_data.append('description', description);
    form_data.append('image', media);
    console.log(typeof(media));
    
    axios.post(`/api/auth/posts`, form_data, config)
        .then(res => {
            dispatch({
                type: CREATE_USER_POST_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: CREATE_USER_POST_FAILURE,
            })
        });
}

// GET POSTS OF AUTHENTICATED USER
//This will likely need to be changed later
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

// GET POSTS FOR A USER
//only their posts, not friends
export const get_user_data = (username) => dispatch => {
    dispatch({ type: USER_POSTS_GET_LOADING });

    axios.get('/api/auth/${username}')
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
