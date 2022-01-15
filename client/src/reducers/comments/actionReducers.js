import {
    EDIT_COMMENT, 
    EDIT_COMMENT_SUCCESS,
    EDIT_COMMENT_FAILURE,
    DELETE_COMMENT_FAILURE,
    DELETE_COMMENT_SUCCESS,
    LIKE_COMMENT_FAILURE,
    LIKE_COMMENT_SUCCESS
    
} from "./actionTypes.js"
const initialState = {
    commentsArray : null,
    displayShowDown :  null,  // comments.length > commentPaginationCount,
    displayShowUp : false,
    commentsCountLeft :  null , //comments.length - commentsArray.length,
}

const commentPaginationCount = 2






function commentsReducer(state= initialState, action){
    switch(action.type){
        case SHOW_COMMENTS:
            const commentsArray = action.data.posts.comments.slice(0 , commentPaginationCount)
            return {
                ...state,
                commentsArray ,
                displayShowDown : action.data.posts.comments.length > commentPaginationCount,
                commentsCountLeft : action.data.posts.comments.length - commentsArray.length
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
        commentsCountLeft : allComments.length - commentsArray.length
    }
}