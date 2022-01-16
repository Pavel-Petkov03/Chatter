import { useDispatch, useSelector} from 'react-redux'
import {useEffect,} from "react"
import Api from "../api/api.js"
import Post from "./Post.jsx"
import store from "../reducers/rootReducer.js"
import { GET_POST_FAILURE, GET_POST_SUCCESS} from '../reducers/posts/actionTypes.js'
import { useNavigate } from 'react-router-dom'
export function Board(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const api = new Api("http://localhost:5000/posts", dispatch, "application/json")
    useEffect(() => {
        async function getPosts(){
          api.get({success : GET_POST_SUCCESS, failure : GET_POST_FAILURE}).catch(er => {
            navigate("/login")
          })
        } 
        getPosts()
    }, []);


  return (
    <div className="post-placeholder">
        {store.getState().posts.posts ? store.getState().posts.posts.map(Post) : null }
    </div>
  )
}


