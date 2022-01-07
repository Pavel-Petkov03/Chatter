import {
    CREATE_COMMENT_FAILURE,
    CREATE_COMMENT_SUCCESS,
    DELETE_POST_FAILURE,
    DELETE_POST_SUCCESS, 
    EDIT_POST_FAILURE, 
    EDIT_POST_SUCCESS,
    LIKE_POST_FAILURE,
    LIKE_POST_SUCCESS,
    SAVE_POST_FAILURE,
    SAVE_POST_SUCCESS, 
} 
from "./actionTypes.js"

const commentPaginationCount =  2

function postReducer(state , action){
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
                editMode : false
            }
        
        case CREATE_COMMENT_FAILURE : 
        case DELETE_POST_FAILURE : 
        case EDIT_POST_FAILURE : 
        case SAVE_POST_FAILURE :
        case LIKE_POST_FAILURE :
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
                clickedComment : true
            }
        
        case LIKE_POST_SUCCESS :
            return {
                ...state,
                isLiked : true
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
        commentsCountLeft : allComments - commentsArray
    }
}


// this is initial state is post component // will be used later
const initialState = {
    editMode : false,
    errorMessage : "",
    clickedComment : false,
    commentsArray : comments.slice(0,commentPaginationCount),
    displayShowDown : comments.length > commentPaginationCount,
    displayShowUp : false,
    commentsCountLeft : comments.length - commentsArray.length,
    isEmojiFieldClicked : false,
    isLiked : false
}