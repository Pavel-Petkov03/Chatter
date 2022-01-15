import { postReducer } from "./posts/actionReducers.js";
import { combineReducers , createStore} from 'redux'


const rootReducer = combineReducers({
    posts : postReducer
})

export default createStore(rootReducer)
