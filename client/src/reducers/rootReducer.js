import { postReducer } from "./posts/actionReducers.js";
import { combineReducers , createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'


const rootReducer = combineReducers({
    posts : postReducer,
})

const store =  createStore(rootReducer, applyMiddleware(thunk))

export default store