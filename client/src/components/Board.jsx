import {useEffect} from "react"
import Post from "./Post.jsx"
export function Board({posts , post}){
    useEffect(() => {
        post.getPost()
    }, [])

  return (
    <div className="post-placeholder">
        {posts.posts.length !== 0 ? posts.posts.map((args) => <Post {...args}/>) : null}
    </div>
  )
}

