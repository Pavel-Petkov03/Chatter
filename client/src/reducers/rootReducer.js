import { postReducer } from "./posts/actionReducers.js";
import { combineReducers } from 'redux'


export default combineReducers({
    post : postReducer
})