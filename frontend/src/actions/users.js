import axios from 'axios';
import { createMessage, returnErrors } from './errors';
import { tokenConfig } from "./auth";

import { 
    USER_PROFILES_GET_LOADING,
    USER_PROFILES_GET_SUCCESS,
    USER_PROFILES_GET_FAILURE,
    SETTINGS_UPDATE_FAILURE,
    SETTINGS_UPDATE_SUCCESS,
    SETTINGS_UPDATE_PROCESSING
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

// SAVE NEW USER SETTINGS
export const save_user_settings = (show_email_on_profile, dark_mode) => (dispatch, getState) => {
    dispatch({
        type: SETTINGS_UPDATE_PROCESSING
    })
    const config = tokenConfig(getState);
    const body = JSON.stringify({ show_email_on_profile, dark_mode });

    axios.put('/updateUserSettings', body, config)
        .then(res => {
            dispatch(createMessage({ settingsSaved: "Settings Saved!" }));
            dispatch({
                type: SETTINGS_UPDATE_SUCCESS
            })
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: SETTINGS_UPDATE_FAILURE
            })
        })
}