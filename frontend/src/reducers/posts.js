import { 
    USER_POSTS_GET_FAILURE,
    USER_POSTS_GET_SUCCESS,
    USER_POSTS_GET_LOADING,
    CLEAR_USERS_POSTS,
    UPDATE_USER_POST_FAILURE,
    UPDATE_USER_POST_SUCCESS,
    USER_POSTS_CREATE_FAILURE,
    USER_POSTS_CREATE_SUCCESS
 } from "../actions/types";

const initialState = {
    postsLoading: false,
    userPosts: null
 };

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_POSTS_GET_SUCCESS:
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
        case UPDATE_USER_POST_SUCCESS:
            const updatedPosts = state.userPosts.map(
                (post, i) => {
                    return post.id === action.payload.id ? action.payload
                        : post
                }
            )
            return {
                ...state,
                userPosts: updatedPosts
            }
        case USER_POSTS_CREATE_SUCCESS:
            return {
                userPosts: action.payload,
                ...state
            }
        case USER_POSTS_CREATE_FAILURE:
            return {
                ...state,
                postsLoading: false,
                userPosts: null
            }
            
        default:
            return state

    }

}

