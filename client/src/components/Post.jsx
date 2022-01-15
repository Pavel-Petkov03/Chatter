import "../styles/Post.css"
import { useRef, useReducer , useEffect} from "react"
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
import { CLICK_COMMENT, EMOJI_CLICK, SHOW_DOWN, SHOW_UP, LIKE_POST_SUCCESS, LIKE_POST_FAILURE , START_APPLICATION} from "../reducers/posts/actionTypes"
import Api from "../api/api"
import { LIKE_COMMENT_SUCCESS } from "../reducers/comments/actionTypes"
import CustomModal from "./Modals/CustomModal.jsx"
import { useDispatch } from "react-redux"
import store from "../reducers/rootReducer.js"

export default function Post({
    userImage, username, postImage , content, _id, commentsArray, likesArray
}){
    console.log(content)
    const postCommentArea = useRef(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({type : START_APPLICATION, commentsArray})
    }, []);

    const currentImg = userImage ? userImage  : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
    return (
        <article className="post" key={_id}>
            <div className="name-row">
                <img src={currentImg} alt="" className="name-row-img"/>
                <h5 className="name-row-name">{username}</h5>
            </div>
            <p className="post-content-text">{content}</p>
            <div className="post-content">
                <img src={postImage} alt="" className="post-image"/>
                <div className="post-footer">
                    <div className="post-buttons">
                        <FaRegCommentAlt color={store.getState().posts.clickedComment ? "gray" : "black"} onClick={() => dispatch({type : CLICK_COMMENT})} />
                        <CustomHeart likedBool={store.getState().posts.isLiked} customClickEvent={() => dispatch({type : LIKE_POST_SUCCESS})} />
                    </div>
                 </div>
            </div>
            {store.getState().posts.isEmojiFieldClicked ?
             <Picker 
                onEmojiClick={(ev, emojiObject) => postCommentArea.current.value += emojiObject.emoji} 
                pickerStyle={{position : "absolute",  margin : "60px 270px"}} /> 
             : null}
            {store.getState().posts.clickedComment ? <>
            <div className="comment-create-section">
                <textarea ref={postCommentArea} className="comment-create"/>
                <div className="post-tasks">
                    <FaRegLaughBeam  onClick={() => dispatch({type : EMOJI_CLICK})}/>
                    <FaArrowCircleRight className="post-comment"/>
                </div>
            </div>
            </> : null}
            <section className="comment-section">
                {store.getState().posts.commentsArray}
                <div className="arrows">
                <div className="arrows-icons">
                    {store.getState().posts.displayShowDown ? <FaArrowDown onClick={() => dispatch({type : SHOW_DOWN, allComments : commentsArray})}/> : null}
                    {store.getState().posts.displayShowUp ? <FaArrowUp onClick={() => dispatch({type : SHOW_UP, allComments : commentsArray})}/> : null}
                </div>
                {store.getState().posts.commentsCountLeft !== 0 ? <p className="comments-left">{store.getState().posts.commentsCountLeft} comments left</p> : null}
            </div>
            </section>
        </article>
    )
}
