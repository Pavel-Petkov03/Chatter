import {useEffect} from "react"
import Post from "./Post.jsx"
import { useNavigate } from "react-router-dom"
export function Board(props){
    console.log(props)
    const navigate = useNavigate()
    useEffect(() => {
        props.posts.dispatch.get(navigate)
    }, [])

  return (
    <div className="post-placeholder">
        {props.posts.state.posts.length !== 0 ? Object.entries(props.posts.state.posts).map(postData => <Post  {...{postData , props}}/> ) : null}
    </div>
  )
}


//