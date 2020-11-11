import { 
    PAGES_GET_LOADING,
    PAGES_GET_SUCCESS,
    PAGES_GET_FAILURE
 } from "./types";
 
const initialState = {
    pagesLoading: false,
    userPages: null
 };

export default function (state = initialState, action) {
    switch (action.type) {
        case PAGES_GET_LOADING:
            return {
                ...state,
                userPages: action.payload,
                pagesLoading: false
            }
        case PAGES_GET_FAILURE:
            return {
                ...state,
                pagesLoading: false,
                userPages: null
            }
        case PAGES_GET_SUCCESS:
            return {
                userPages: action.payload,
                ...state
            }
            
        default:
            return state

    }

}