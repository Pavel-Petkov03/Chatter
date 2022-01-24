import { LOGIN_FAILURE } from "../auth/actionTypes.js"
import {
    CREATE_COMMENT_FAILURE,
    CREATE_COMMENT_SUCCESS,
    DELETE_POST_FAILURE,
    DELETE_POST_SUCCESS, 
    EDIT_POST_FAILURE, 
    EDIT_POST_SUCCESS,
    EMOJI_CLICK,
    LIKE_POST_FAILURE,
    LIKE_POST_SUCCESS,
    SAVE_POST_FAILURE,
    SAVE_POST_SUCCESS, 
    CLICK_COMMENT,
    EDIT_POST,
    GET_POST_SUCCESS,
    GET_POST_FAILURE
} 
from "./actionTypes.js"



const initialState = {
    editMode : false,
    errorMessage : "",
    clickedComment : false,
    isEmojiFieldClicked : false,
    isLiked : false,
    posts : {}
}




export function postReducer(state = initialState, action){
    switch (action.type){
        // if correct api call the state is reseted
        case CREATE_COMMENT_SUCCESS :
        case EDIT_POST_SUCCESS :
        case DELETE_POST_SUCCESS :
        case SAVE_POST_SUCCESS : 
            return {
                ...state , 
                clickedComment : false , 
                isEmojiFieldClicked : false,
                editMode : false,
                errorMessage : ""
            }
        
        case CREATE_COMMENT_FAILURE : 
        case DELETE_POST_FAILURE : 
        case EDIT_POST_FAILURE : 
        case SAVE_POST_FAILURE :
        case LIKE_POST_FAILURE :
        case GET_POST_FAILURE : 
        case LOGIN_FAILURE : 
            return {
                ...state ,
                errorMessage : action.errorMessage
            }

        case EDIT_POST:
            return {
                ...state,
                editMode : true,
            }
        
        case CLICK_COMMENT:
            state.posts[action._id].clickedComment = !state.posts[action._id].clickedComment
            return {
                ...state,
            }
        
        case EMOJI_CLICK:
            state.posts[action._id].isEmojiFieldClicked = !state.posts[action._id].isEmojiFieldClicked
            return {
                ...state
            }
        
        case LIKE_POST_SUCCESS :
            state.posts[action._id].isLiked = !state.posts[action._id].isLiked
            return {
                ...state,
            }
        
        case GET_POST_SUCCESS:
            return {
                ...state,
                posts : {...action.data.posts , ...addState(state.posts)}
            }
        default : return state
    }
}

function addState(obj){
    return Object.entries(obj).reduce((acc , [k , v]) => Object.assign(acc , {[k] : {...v , initialState}}), {})
}


