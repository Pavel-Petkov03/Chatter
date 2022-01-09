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
import { CLICK_COMMENT, EMOJI_CLICK, SHOW_DOWN, SHOW_UP, LIKE_POST_SUCCESS, LIKE_POST_FAILURE } from "../reducers/posts/actionTypes"
import { postReducer } from "../reducers/posts/actionReducers"
import Api from "../api/api"
import { LIKE_COMMENT_SUCCESS } from "../reducers/comments/actionTypes"
import CustomModal from "./Modals/CustomModal.jsx"

const commentPaginationCount = 2
export default function Post({
    userImage, username, postImg , content, postId
}){
    const comments = [
    <Comment content={"bASI"} ownerName={"PAVKATA"} ownerImage={"https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"}></Comment>,
    <Comment content={`e.`} ownerName={"PAVKATA"} ownerImage={"https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"}></Comment>,
    <Comment content={"bASI"} ownerName={"PAVKATA"} ownerImage={"https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"}></Comment>,
    <Comment content={"bASI"} ownerName={"PAVKATA"} ownerImage={"https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"}></Comment>,
    <Comment content={`e.`} ownerName={"PAVKATA"} ownerImage={"https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"}></Comment>,
    <Comment content={"bASI"} ownerName={"PAVKATA"} ownerImage={"https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"}></Comment>,
    // <Comment content={`Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam labore excepturi quaerat sed reprehenderit. Ex rerum possimus minima, quasi esse ducimus eos perferendis aperiam magni ipsam corrupti nemo, cum inventore.`} ownerName={"PAVKATA"} ownerImage={"https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"}></Comment>
    ]

    const commentsArray  = comments.slice(0,commentPaginationCount)
    const initialState = {
        editMode : false,
        errorMessage : "",
        clickedComment : false,
        commentsArray ,
        displayShowDown : comments.length > commentPaginationCount,
        displayShowUp : false,
        commentsCountLeft : comments.length - commentsArray.length,
        isEmojiFieldClicked : false,
        isLiked : false
    }


    const [state , dispatch] = useReducer( postReducer, initialState)
    const postCommentArea = useRef(null)
    const api = new Api(dispatch)

    useEffect(() => {
        api.get("https://localhost:5000" , null, {successStateMessage : LIKE_POST_SUCCESS , failureStateMessage : LIKE_POST_FAILURE})
    }, []);
    {console.log(state)}
    

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
                        <FaRegCommentAlt color={state.clickedComment ? "gray" : "black"} onClick={() => dispatch({type : CLICK_COMMENT})} />
                        <CustomHeart likedBool={state.isLiked} customClickEvent={() => dispatch({type : LIKE_POST_SUCCESS})} />
                    </div>
                 </div>
            </div>
            {state.isEmojiFieldClicked ?
             <Picker 
                onEmojiClick={(ev, emojiObject) => postCommentArea.current.value += emojiObject.emoji} 
                pickerStyle={{position : "absolute",  margin : "60px 270px"}} /> 
             : null}
            {state.clickedComment ? <>
            <div className="comment-create-section">
                <textarea ref={postCommentArea} className="comment-create"/>
                <div className="post-tasks">
                    <FaRegLaughBeam  onClick={() => dispatch({type : EMOJI_CLICK})}/>
                    <FaArrowCircleRight className="post-comment"/>
                </div>
            </div>
            </> : null}
            <section className="comment-section">
                {state.commentsArray}
                <div className="arrows">
                <div className="arrows-icons">
                    {state.displayShowDown ? <FaArrowDown onClick={() => dispatch({type : SHOW_DOWN, allComments : comments})}/> : null}
                    {state.displayShowUp ? <FaArrowUp onClick={() => dispatch({type : SHOW_UP, allComments : comments})}/> : null}
                </div>
                {state.commentsCountLeft !== 0 ? <p className="comments-left">{state.commentsCountLeft} comments left</p> : null}
            </div>
            </section>
        </article>
    )
}
