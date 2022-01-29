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
    paginationCounter  : 1
}


const commentState = {
    commentsCountLeft :  null ,
}




export function postReducer(state={posts : {}}, action){ // posts is rendered from GET_POSTS action payload func
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
            state.posts =  {...state.posts , ...addState(action.data.posts, postState)}
            return {
                ...state,
            }
            // comments
        case SHOW_COMMENTS: // sets all the state of the comments in current post
            currentPost = state.posts[action._id]
            currentPost.comments = Object
                .entries(action.comments)
                .reduce((acc , [_ , {_id , ...state}]) =>
                    Object.assign(acc , {[_id] : {...{...state , ...commentState}}}), {})
            return {
                ...state,
            }
        // pagination counter will be used in the component directly with pagination comment slicer
        case SHOW_DOWN :
            state.posts[action.postId].paginationCounter++
            return {
                ...state ,
            }
        case SHOW_UP :
            state.posts[action.postId].paginationCounter--
            return {
                ...state ,
            }
        case CREATE_COMMENT_SUCCESS :
        case  EDIT_COMMENT_SUCCESS  :
            Object.assign(state.posts[action.postId].comments[action.commentId] , {...action.data})
            return {
                ...state,
            }

        case DELETE_COMMENT_SUCCESS :
            delete state.posts[action._id].comments[action._id]
            return {
                ...state
            }
        default : return state
    }
}

function addState(obj, state){
    return Object.entries(obj).reduce((acc , [k , v]) => Object.assign(acc , {[k] : {...{...v , ...state}}}), {})
}