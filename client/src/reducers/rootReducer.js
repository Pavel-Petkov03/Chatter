import { postReducer } from "./posts/actionReducers.js";
import { combineReducers , createStore} from 'redux'


const rootReducer = combineReducers({
    post : postReducer
})

export default createStore(rootReducer)
