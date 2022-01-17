import { postReducer } from "./posts/actionReducers.js";
import { commentsReducer } from "./comments/actionReducers.js";
import { combineReducers , createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'


const rootReducer = combineReducers({
    posts : postReducer,
    comments : commentsReducer
})

const store =  createStore(rootReducer, applyMiddleware(thunk))

export default store