import { useDispatch} from 'react-redux'
import {useEffect, useState} from "react"
import Api from "../api/api.js"
import Post from "./Post.jsx"
import store from "../reducers/rootReducer.js"
import { SAVE_POST_FAILURE, SAVE_POST_SUCCESS } from '../reducers/posts/actionTypes.js'
export function Board(ptops){
    const dispatch = useDispatch()
    const [posts , setPosts] = useState([])
    const api = new Api("http://localhost:5000/posts", dispatch, "application/json", "/login" , null )
    useEffect(() => {
    setPosts(async () =>  (await api.get({successStateMessage : SAVE_POST_SUCCESS, failureStateMessage : SAVE_POST_FAILURE})).posts)
  }, [])

  return (
    <div className="post-placeholder">
        {Object.values(posts).map(Post)}
    </div>
  )
}


