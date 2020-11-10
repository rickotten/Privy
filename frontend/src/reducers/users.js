import { 
    USER_PROFILES_GET_LOADING,
    USER_PROFILES_GET_SUCCESS,
    USER_PROFILES_GET_FAILURE
 } from "./types";
 
const initialState = {
    profilesLoading: false,
    userProfiles: null
 };

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_PROFILES_GET_LOADING:
            return {
                ...state,
                userProfiles: action.payload,
                profilesLoading: false
            }
        case USER_PROFILES_GET_FAILURE:
            return {
                ...state,
                profilesLoading: false,
                userProfiles: null
            }
        case USER_PROFILES_GET_SUCCESS:
            return {
                userProfiles: action.payload,
                ...state
            }
            
        default:
            return state

    }

}

