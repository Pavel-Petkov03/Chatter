import "../styles/Post.css"
import { useState, useEffect } from "react"
import {FaRegCommentAlt, FaHeart, FaRegHeart, FaArrowCircleRight, FaRegLaughBeam} from "react-icons/fa"
import Picker from "emoji-picker-react"
export default function Post({
    userImage, username, postImg , content, 
}){
    const [isCommentClicked, setIsCommentClicked] = useState(false)
    const [isGray , setIsGray] = useState(false)
    // this will be setted by props
    const [liked , setIsLiked] = useState(false)
    const [isOpenEmojiClicked , setIsOpenEmojiClicked] = useState(false)
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
                            setIsOpenEmojiClicked(bool => false)
                        }} />
                        {Icon = liked ? FaHeart : FaRegHeart}
                        <Icon color={liked ? "red" : "black"} onClick={() => setIsLiked(l => !l )}/> 
                    </div>
                 </div>
            </div>
            {isOpenEmojiClicked ? <Picker pickerStyle={{position : "absolute",  margin : "60px 270px"}} /> : null}
            {isCommentClicked ? <>
            <div className="comment-create-section">
                <textarea className="comment-create"/>
                
                <div className="post-tasks">
                    <FaRegLaughBeam  onClick={() => setIsOpenEmojiClicked(e => !e)}/>
                    <FaArrowCircleRight className="post-comment"/>
                </div>
                
            </div>
                {/* todo improve post comment design */}
            </> : null}
        </article>
    )
}


