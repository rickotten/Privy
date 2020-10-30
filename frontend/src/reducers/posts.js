import { 
    USER_POSTS_GET_FAILURE,
    USER_POSTS_GET_SUCESS,
    USER_POSTS_GET_LOADING,
    CLEAR_USERS_POSTS
 } from "../actions/types";

const initialState = {
    postsLoading: false,
    userPosts: null
 };

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_POSTS_GET_SUCESS:
            return {
                ...state,
                userPosts: action.payload,
                postsLoading: false
            }
        case USER_POSTS_GET_LOADING:
            return {
                ...state,
                postsLoading: true,
            }
        case USER_POSTS_GET_FAILURE:
            return {
                ...state,
                postsLoading: false,
                userPosts: null
            }
        case CLEAR_USERS_POSTS:
            return {
                ...state,
                postsLoading: false,
                userPosts: null
            }
        
        default:
            return state

    }

}

