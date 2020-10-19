import { combineReducers } from "redux";

import errors from './errors';
import auth from './auth';
import messages from './messages';
import posts from "./posts";

export default combineReducers({
    errors,
    auth,
    messages,
    posts
});
