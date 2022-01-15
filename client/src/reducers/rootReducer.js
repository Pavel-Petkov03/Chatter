import { postReducer } from "./posts/actionReducers.js";
import { commentsReducer } from "./comments/actionReducers.js";
import { combineReducers , createStore} from 'redux'


const rootReducer = combineReducers({
    posts : postReducer,
    comments : commentsReducer
})

export default createStore(rootReducer)
