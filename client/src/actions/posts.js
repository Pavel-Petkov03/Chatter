import Api from "../api/api"
import { GET_POST_FAILURE, GET_POST_SUCCESS } from "../reducers/posts/actionTypes"

const api = new Api("http://localhost:5000/posts","application/json")


function getPosts(){
    return function(dispatch){
        api.get().then(data => dispatch({type : GET_POST_SUCCESS, data}))
        .catch(er => dispatch({type : GET_POST_FAILURE, errorMessage : er.message}))
    }
}


// function createPost(payload){
//     return function(dispatch){
//         api.post(payload)
//         .then(data => dispatch({type : CREATE_POST_SUCCESS, data}))
//         .catch(er => dispatch({type : CREATE_POST_SUCCESS, errorMessage : er.message}))
//     }
// }


// function patchPost(payload){
//     return function(dispatch){
//         api.patch(payload)
//         .then(data => dispatch({type : CREATE_POST_SUCCESS, data}))
//         .catch(er => dispatch({type : CREATE_POST_SUCCESS, errorMessage : er.message}))
//     }
// }


// function deletePost(record){
//     return function(dispatch){
//         api.delete(record)
//         .then(data => dispatch({type : CREATE_POST_SUCCESS, data}))
//         .catch(er => dispatch({type : CREATE_POST_SUCCESS, errorMessage : er.message}))
//     }
// }

export {
    getPosts
}