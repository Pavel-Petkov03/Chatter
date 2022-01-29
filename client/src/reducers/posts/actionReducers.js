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
    GET_POST_FAILURE,
    EDIT_COMMENT,
    EDIT_COMMENT_SUCCESS,
    EDIT_COMMENT_FAILURE,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAILURE,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILURE,
    SHOW_UP,
    SHOW_DOWN,
    SHOW_COMMENTS,
    LIKE_COMMENT_SUCCESS,
    LIKE_COMMENT_FAILURE,
}
from "./actionTypes.js"




const postState = {
    editMode : false,
    errorMessage : "",
    clickedComment : false,
    isEmojiFieldClicked : false,
    isLiked : false,
    posts : {}
}


const commentState = {
    commentsArray : null,
    displayShowDown :  null,  // comments.length > commentPaginationCount,
    displayShowUp : false,
    commentsCountLeft :  null , //comments.length - commentsArray.length,
    allComments : null
}

const commentPaginationCount = 2




export function postReducer(state={posts : {}}, action){
    let currentPost
    switch (action.type){
        // if correct api call the state is reset
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
                posts : {...action.data.posts , ...addState(state.posts, postState)}
            }
            // comments
        case SHOW_COMMENTS: // this is setter of comments when post is rendered
            console.log(action)
            currentPost = state.posts[action._id]
            currentPost.allComments = currentPost.allComments || addState(formatData(action.comments), commentState)
            currentPost.commentsArray = Object.entries(currentPost.allComments).slice(0 , commentPaginationCount).
            reduce((acc , [k , v]) => Object.assign(acc , {[k] : v}) , {})
            currentPost.displayShowDown = currentPost.allComments.length > commentPaginationCount
            currentPost.commentsCountLeft = currentPost.allComments.length - currentPost.commentsArray.length
            return {
                ...state,
            }

        case SHOW_DOWN :
            currentPost = state.posts[action._id]
            Object.assign(currentPost , {...showDownAndUpChecker(state.commentsArray , state.allComments , "down")})
            return {
                ...state ,
            }
        case SHOW_UP :
            currentPost = state.posts[action._id]
            Object.assign(currentPost , {...showDownAndUpChecker(state.commentsArray , state.allComments , "up")})
            return {
                ...state ,
            }
        case CREATE_COMMENT_SUCCESS :
        case  EDIT_COMMENT_SUCCESS  :
            state.posts[action._id].allComments[action._id] = {
                ...action.data
            }
            return {
                ...state,
            }

        case DELETE_COMMENT_SUCCESS :
            delete state.posts[action._id].allComments[action._id]
            return {
                ...state
            }
        default : return state
    }
}

function addState(obj, state){
    return Object.entries(obj).reduce((acc , [k , v]) => Object.assign(acc , {[k] : {...v , state}}), {})
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

function formatData(array){
    return array.reduce((acc , {_id , ...state}) => {
        acc[_id] = state
        return acc
    }, {})
}