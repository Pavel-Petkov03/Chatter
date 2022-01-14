import { useDispatch} from 'react-redux'
import {useEffect, useState} from "react"
import Api from "../api/api.js"
import Post from "./Post.jsx"
import store from "../reducers/rootReducer.js"
import { SAVE_POST_FAILURE, SAVE_POST_SUCCESS } from '../reducers/posts/actionTypes.js'
export function Board({}){
    const dispatch = useDispatch()
    const [posts , setPosts] = useState([])
    useEffect(() => {
    setPosts(() => new Api("http://localhost:5000/posts", dispatch, "application/json", "/login").get({successStateMessage : SAVE_POST_SUCCESS, failureStateMessage : SAVE_POST_FAILURE}))
  }, [])

  return (
    <div className="post-placeholder">
        {Object.values(posts).map(Post)}
    </div>
  )
}


