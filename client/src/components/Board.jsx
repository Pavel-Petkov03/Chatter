import {useEffect} from "react"
import Post from "./Post.jsx"
import { useNavigate } from "react-router-dom"
export function Board({posts : {dispatch, state} , comments}){
    const navigate = useNavigate()
    useEffect(() => {
        dispatch.get(navigate)
    }, [])

  return (
    <div className="post-placeholder">
        {state.posts.length !== 0 ? state.posts.map((postProps) => <Post {{post : postProps, comments}}/>) : null}
    </div>
  )
}

