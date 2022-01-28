
import Api from "../api/api";
import {CREATE_COMMENT_FAILURE, CREATE_COMMENT_SUCCESS} from "../reducers/posts/actionTypes";
import {
    DELETE_COMMENT_FAILURE,
    DELETE_COMMENT_SUCCESS,
    EDIT_COMMENT_FAILURE,
    EDIT_COMMENT_SUCCESS
} from "../reducers/comments/actionTypes";

const api = new Api(null , "application.json")
const endpoint  = "http://localhost:5000/comments/"


function createPost(dispatch){
    return function (postId , body){
        api.endpoint = `${endpoint}${postId}`
        api.post(body).then(data => dispatch({type : CREATE_COMMENT_SUCCESS , data})
        ).catch(er => dispatch({type : CREATE_COMMENT_FAILURE , errorMessage : er.message}))
    }
}


function patchComment(dispatch){
    return function (postId , commentId , body){
        api.endpoint = `${endpoint}${postId}/${commentId}`
        api.post(body).then(data => dispatch({type : EDIT_COMMENT_SUCCESS, data}))
            .catch(er => dispatch({type : EDIT_COMMENT_FAILURE, errorMessage : er.message}))
    }
}


function deleteComment(dispatch){
    return function (postId, commentId){
        api.endpoint = `${endpoint}${postId}/${commentId}`
        api.delete().then(data => dispatch({type : DELETE_COMMENT_SUCCESS, data})).
            catch(er => dispatch({type : DELETE_COMMENT_FAILURE , errorMessage : er.message}))
    }
}

export {
    createPost,
    patchComment,
    deleteComment
}