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
import {
    CLICK_COMMENT, EMOJI_CLICK, LIKE_POST_SUCCESS, LIKE_POST_FAILURE , SHOW_COMMENTS
} from "../reducers/posts/actionTypes"
import Api from "../api/api"
import { useDispatch } from "react-redux"
import store from "../reducers/rootReducer.js"

export default ({postData : [_id , {
    userImage , content , username , postImage, comments
}] , props}) => {
    const dispatch = useDispatch()
    const postState = props.posts.state
    const postCommentArea = useRef(null)


    useEffect(() => {
        dispatch({type : SHOW_COMMENTS, comments, _id})
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
                        <FaRegCommentAlt color={postState.posts[_id].clickedComment ? "gray" : "black"} onClick={() => dispatch({type : CLICK_COMMENT , _id})} />
                        {/*// this is going to be in action file*/}
                        <CustomHeart likedBool={postState.posts[_id].isLiked} customClickEvent={() => dispatch({type : LIKE_POST_SUCCESS, _id})} />
                    </div>
                 </div>
            </div>
            {postState.posts[_id].isEmojiFieldClicked ?
             <Picker
                onEmojiClick={(ev, emojiObject) => postCommentArea.current.value += emojiObject.emoji}
                pickerStyle={{position : "absolute",  margin : "60px 270px"}} />
             : null}
            {postState.posts[_id].clickedComment ? <>
            <div className="comment-create-section">
                <textarea ref={postCommentArea} className="comment-create"/>
                <div className="post-tasks">
                    <FaRegLaughBeam  onClick={() => dispatch({type : EMOJI_CLICK, _id})}/>
                    <FaArrowCircleRight className="post-comment"/>
                </div>
            </div>
            </> : null}
            <section className="comment-section">
                {postState.posts[_id].comments  ? Object.entries(postState.posts[_id].comments).map(([commentId , data]) => <Comment {...{commentId , _id,...data, props : props.posts}} />)
                    : null}
            </section>
        </article>
    )
}
