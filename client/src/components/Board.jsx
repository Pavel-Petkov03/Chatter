import { useDispatch} from 'react-redux'
import {useEffect, useState} from "react"
import Api from "../api/api.js"
import Post from "./Post.jsx"
export function Board(){
    const dispatch = useDispatch()
    const [posts , setPosts] = useState([])
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MWRhNTA5YWZjMjAyNWNlNWJlOTcyNmMiLCJpYXQiOjE2NDE3NTE1NjYsImV4cCI6MTY0MTc1MTg2Nn0.6atJT3_-jamHmd1u3m6Sjiv3XXyexiFoI6iFRyi3nI0"
    useEffect(() => {
    setPosts(() => new Api(dispatch).get("http://localhost:5000/posts", token, {successStateMessage : "", failureStateMessage : ""}))
  }, [])

  return (
    <div className="post-placeholder">
        {Object.values(posts).map(Post)}
    </div>
  )
}


