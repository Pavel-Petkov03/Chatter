import { useDispatch, useState  } from 'react-redux'
import {useEffect} from "react"
import Api from "../api/api.js"
import Post from "./Post.jsx"
export function Board(){
    const dispatch = useDispatch()
    const [posts , setPosts] = useState(null)
    useEffect(() => {
    setPosts(() => Api(dispatch).get("https://localhost:5000/posts", "", {successStateMessage : "", failureStateMessage : ""}))
  }, [posts])

  return (
    <div className="post-placeholder">
        {Object.values(posts).map(Post)}
    </div>
  )
}


