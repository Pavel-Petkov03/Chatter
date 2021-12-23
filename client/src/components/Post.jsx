import "../styles/Post.css"
import { useState, useEffect } from "react"
import {FaRegCommentAlt, FaHeart, FaRegHeart} from "react-icons/fa"
export default function Post({
    userImage, username, postImg , content, 
}){
    const [isCommentClicked, setIsCommentClicked] = useState(false)
    const [isGray , setIsGray] = useState(false)
    const [liked , setIsLiked] = useState(false)
    let Icon
    const currentImg = userImage ? userImage  : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
    return (
        <article className="post">
            <div className="name-row">
                <img src={currentImg} alt="" className="name-row-img"/>
                <h5 className="name-row-name">{username}</h5>
            </div>
            <p className="post-content-text">{content}</p>
            <div className="post-content">
                <img src={postImg} alt="" className="post-image"/>
                <div className="post-footer">
                    <div className="post-buttons">
                        <FaRegCommentAlt color={isGray ? "gray" : "black"} onClick={() => {
                            setIsCommentClicked(last => !last)
                            setIsGray(gray => !gray)
                        }} />
                        {Icon = liked ? FaHeart : FaRegHeart}
                        <Icon color={liked ? "red" : "black"} onClick={() => setIsLiked(l => !l )}/> 
                    </div>
                 </div>
            </div>
            {isCommentClicked ? <>
            <div><textarea className="comment-create"/></div>
                {/* todo improve post comment design */}
            </> : null}
        </article>
    )
}


