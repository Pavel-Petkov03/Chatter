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
    SHOW_DOWN,
    SHOW_UP,
    EDIT_POST,
    START_APPLICATION,
    GET_POST_SUCCESS,
    GET_POST_FAILURE
} 
from "./actionTypes.js"

const commentPaginationCount =  2



const initialState = {
    editMode : false,
    errorMessage : "",
    clickedComment : false,
    commentsArray : null,
    displayShowDown :  null,  // comments.length > commentPaginationCount,
    displayShowUp : false,
    commentsCountLeft :  null , //comments.length - commentsArray.length,
    isEmojiFieldClicked : false,
    isLiked : false,
    posts : []
}



export function postReducer(state = initialState, action){
    console.log(action)
    switch (action.type){
        
        case START_APPLICATION:
            const commentsArray = action.comments.slice(0 , commentPaginationCount).slice()
            return {
                ...state,
                commentsArray ,
                displayShowDown : action.comments.length > commentPaginationCount,
                commentsCountLeft : action.comments.length - commentsArray.length
            }
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
            return {
                ...state,
                clickedComment : !state.clickedComment
            }
        
        case EMOJI_CLICK:
            return {
                ...state,
                isEmojiFieldClicked : !state.isEmojiFieldClicked
            }
        
        case LIKE_POST_SUCCESS :
            return {
                ...state,
                isLiked : !state.isLiked
            }
        case SHOW_DOWN : 
            return {
                ...state ,
                ...showDownAndUpChecker(state.commentsArray , action.allComments , "down")
            }
        case SHOW_UP : 
            return {
                ...state ,
                ...showDownAndUpChecker(state.commentsArray , action.allComments , "up")
            }
        case GET_POST_SUCCESS:
            return {
                ...state,
                posts : action.data.posts.slice()
            }
        default : return state
    }
}




function showDownAndUpChecker(stateComments , allComments , upOrDown){
    let commentsArray
    let displayShowDown = true
    let displayShowUp = true
    if(upOrDown === "down"){
        commentsArray = allComments.slice(0 , stateComments.length + commentPaginationCount)
    }else if(upOrDown == "up"){
        commentsArray = allComments.slice(0 , stateComments.length - commentPaginationCount)
    }


    if(commentsArray.length <= 2){
        displayShowUp = false
    }else if(commentsArray.length === allComments.length){
        displayShowDown = false
    }
    return {
        commentsArray,
        displayShowUp,
        displayShowDown,
        commentsCountLeft : allComments.length - commentsArray.length
    }
}