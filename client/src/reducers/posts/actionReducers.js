import {
    CREATE_COMMENT_SUCCESS,
    DELETE_POST_SUCCESS, 
    EDIT_POST_SUCCESS,
    SAVE_POST_SUCCESS, 
} 
from "./actionTypes.js"


function postReducer(state , action){
    switch (action.type){
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
    }
}



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