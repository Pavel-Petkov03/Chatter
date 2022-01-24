import {
    EDIT_COMMENT, 
    EDIT_COMMENT_SUCCESS,
    EDIT_COMMENT_FAILURE,
    DELETE_COMMENT_FAILURE,
    DELETE_COMMENT_SUCCESS,
    LIKE_COMMENT_FAILURE,
    LIKE_COMMENT_SUCCESS,
SHOW_COMMENTS,
    SHOW_UP,
    SHOW_DOWN
} from "./actionTypes.js"
const initialState = {
    commentsArray : null,
    displayShowDown :  null,  // comments.length > commentPaginationCount,
    displayShowUp : false,
    commentsCountLeft :  null , //comments.length - commentsArray.length,
    allComments : null
}

const commentPaginationCount = 2






export function commentsReducer(state= initialState, action){
    console.log(action.comments)
    switch(action.type){
        case SHOW_COMMENTS:
            const allComments = state.allComments || action.comments
            const commentsArray = allComments.slice(0 , commentPaginationCount)
            return {
                ...state,
                allComments,
                commentsArray ,
                displayShowDown : allComments.length > commentPaginationCount,
                commentsCountLeft : allComments.length - commentsArray.length
            }
        case SHOW_DOWN : 
            return {
                ...state ,
                ...showDownAndUpChecker(state.commentsArray , state.allComments , "down")
            }
        case SHOW_UP : 
            return {
                ...state ,
                ...showDownAndUpChecker(state.commentsArray , state.allComments , "up")
            }
        default:
            return {...state}
    }
}


function showDownAndUpChecker(stateComments , allComments , upOrDown){
    let commentsArray
    let displayShowDown = true
    let displayShowUp = true
    if(upOrDown === "down"){
        commentsArray = allComments.slice(0 , stateComments.length + commentPaginationCount)
    }else if(upOrDown === "up"){
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