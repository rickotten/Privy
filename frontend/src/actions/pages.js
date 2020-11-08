import axios from 'axios';
import { returnErrors } from './errors';

import { 
    PAGES_GET_LOADING,
    PAGES_GET_SUCCESS,
    PAGES_GET_FAILURE
 } from "./types";
 
 // GET PAGES FROM SEARCH
export const get_page_data = (words) => dispatch => {
    dispatch({ type: PAGES_GET_LOADING });

    axios.get('/searchpages/?search=${words}')
        .then(res => {
            dispatch({
                type: PAGES_GET_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: PAGES_GET_FAILURE,
            })
        });
    }