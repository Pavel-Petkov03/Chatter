import { useDispatch} from 'react-redux'
import {useEffect, useState} from "react"
import Api from "../api/api.js"
import Post from "./Post.jsx"
import { SAVE_POST_FAILURE, SAVE_POST_SUCCESS } from '../reducers/posts/actionTypes.js'
export function Board({}){

    const dispatch = useDispatch()
    const [posts , setPosts] = useState([])
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MWRhNTA5YWZjMjAyNWNlNWJlOTcyNmMiLCJpYXQiOjE2NDE3NjE5NzgsImV4cCI6MTY0MTc2MjI3OH0.pazUvbCa3jjGEnDg1b-v1lBq9P7UB8qDQj-mpgMpLRY"
    useEffect(() => {
    setPosts(() => new Api("http://localhost:5000/posts", dispatch, "application/json").get(token, {successStateMessage : SAVE_POST_SUCCESS, failureStateMessage : SAVE_POST_FAILURE}))
  }, [])

  return (
    <div className="post-placeholder">
        {Object.values(posts).map(Post)}
    </div>
  )
}


