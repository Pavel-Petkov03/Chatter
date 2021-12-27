import "../styles/Post.css"
import { useState, useRef } from "react"
import {
    FaRegCommentAlt, 
    FaArrowCircleRight, 
    FaRegLaughBeam, 
    FaArrowDown,
    FaArrowUp
} from "react-icons/fa"
import Picker from "emoji-picker-react"
import Comment from "../components/Comment.jsx"
import CustomHeart from "./CustomHeart"
export default function Post({
    userImage, username, postImg , content, postId
}){
    const comments = [
    <Comment content={"bASI"} ownerName={"PAVKATA"} ownerImage={"https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"}></Comment>,
    <Comment content={`Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam labore excepturi quaerat sed reprehenderit. Ex rerum possimus minima, quasi esse ducimus eos perferendis aperiam magni ipsam corrupti nemo, cum inventore.`} ownerName={"PAVKATA"} ownerImage={"https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"}></Comment>,
    <Comment content={"bASI"} ownerName={"PAVKATA"} ownerImage={"https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"}></Comment>,
    <Comment content={`Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam labore excepturi quaerat sed reprehenderit. Ex rerum possimus minima, quasi esse ducimus eos perferendis aperiam magni ipsam corrupti nemo, cum inventore.`} ownerName={"PAVKATA"} ownerImage={"https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"}></Comment>
    ]

    //TODO use redux for state management(this will be desided)
    const [isCommentClicked, setIsCommentClicked] = useState(false)
    const [commentsCurrentCounter , setCommentsCurrentCounter] = useState(2)
    const [commentsArray , setCommentsArray] = useState(comments.slice(0,2))
    const [isOpenEmojiClicked , setIsOpenEmojiClicked] = useState(false)
    const postCommentArea = useRef(null)
    function onEmojiClick(event, emojiObject){
        postCommentArea.current.value += emojiObject.emoji
    }


    function downClick(){
        if(commentsArray.length >= 2) {
            setCommentsCurrentCounter(l => l+1)
            console.log(commentsCurrentCounter)
            setCommentsArray(comments.slice(0, commentsCurrentCounter*2))
        }
    }

    function upClick(){
        if(2 <  2 * commentsCurrentCounter) {
            setCommentsCurrentCounter(l => l -1 )
            setCommentsArray(comments.slice(0, commentsCurrentCounter*2))
        }
    }


    const currentImg = userImage ? userImage  : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
    return (
        <article className="post" key={postId}>
            <div className="name-row">
                <img src={currentImg} alt="" className="name-row-img"/>
                <h5 className="name-row-name">{username}</h5>
            </div>
            <p className="post-content-text">{content}</p>
            <div className="post-content">
                <img src={postImg} alt="" className="post-image"/>
                <div className="post-footer">
                    <div className="post-buttons">
                        <FaRegCommentAlt color={isCommentClicked ? "gray" : "black"} onClick={() => {
                            setIsCommentClicked(last => !last)
                            setIsOpenEmojiClicked(bool => false)
                        }} />
                        <CustomHeart likedBool={false}></CustomHeart>
                    </div>
                 </div>
            </div>
            {isOpenEmojiClicked ? <Picker  onEmojiClick={onEmojiClick} pickerStyle={{position : "absolute",  margin : "60px 270px"}} /> : null}
            {isCommentClicked ? <>
            <div className="comment-create-section">
                <textarea ref={postCommentArea} className="comment-create"/>
                <div className="post-tasks">
                    <FaRegLaughBeam  onClick={() => setIsOpenEmojiClicked(e => !e)}/>
                    <FaArrowCircleRight className="post-comment"/>
                </div>
            </div>
            </> : null}
            {commentsArray}
            <div className="arrows">
                <FaArrowDown onClick={downClick}/>
                <FaArrowUp onClick={upClick}/>
            </div>
        </article>
    )
}

// slice 2
// show more means times counter ++ 
// show less means times counter --
// display comments.slice(0, 2*counter) // this will be in state clause








