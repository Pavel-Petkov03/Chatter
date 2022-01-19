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
import { CLICK_COMMENT, EMOJI_CLICK, LIKE_POST_SUCCESS, LIKE_POST_FAILURE } from "../reducers/posts/actionTypes"
import Api from "../api/api"
import { LIKE_COMMENT_SUCCESS } from "../reducers/comments/actionTypes"
import { useDispatch } from "react-redux"
import store from "../reducers/rootReducer.js"
import {
    SHOW_UP , SHOW_DOWN, SHOW_COMMENTS
} from "../reducers/comments/actionTypes.js"

export default function Post({
    userImage, username, postImage , content, _id, comments, likesArray
}){
    const postCommentArea = useRef(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({type : SHOW_COMMENTS, comments})
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
                {store.getState().comments.commentsArray}
                <div className="arrows">
                <div className="arrows-icons">
                    {store.getState().comments.displayShowDown ? <FaArrowDown onClick={() => dispatch({type : SHOW_DOWN, allComments : comments})}/> : null}
                    {store.getState().comments.displayShowUp ? <FaArrowUp onClick={() => dispatch({type : SHOW_UP, allComments : comments})}/> : null}
                </div>
                {store.getState().comments.commentsCountLeft !== 0 ? <p className="comments-left">{store.getState().comments.commentsCountLeft} comments left</p> : null}
            </div>
            </section>
        </article>
    )
}
