import axios from 'axios';
import { returnErrors } from './errors';
import { tokenConfig } from "./auth";
import { createMessage } from './errors';
import { CREATE_PAGE_SUCCESS,
            CREATE_PAGE_FAILURE,
            PAGES_GET_LOADING,
            PAGES_GET_SUCCESS,
            PAGES_GET_FAILURE } from "./types";

export const create_page = (title, description) => (dispatch, getState) => {
	const config = tokenConfig(getState);
	const body = JSON.stringify({title, description});

	axios.post('/pages', body, config)
		.then(res => {
			console.log("dispatching")
			dispatch(createMessage({pageCreateSuccess: "Page created!"}))
			dispatch({
				type: CREATE_PAGE_SUCCESS
			})
		}).catch(err => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: CREATE_PAGE_FAILURE
			})
		})
}
 
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