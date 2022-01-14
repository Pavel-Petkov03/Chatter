import { LIKE_POST_FAILURE } from "../posts/actionTypes";
import { LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_SUCCESS } from "./actionTypes";


function  authReducer(state , action){
    switch(action.type){
        case LOGIN_SUCCESS: 
        case REGISTER_SUCCESS : 
            return {
                ...state
                
            }
    }
}