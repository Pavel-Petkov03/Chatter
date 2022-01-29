import "../styles/Comment.css"
import CustomHeart from "./CustomHeart"
import store from "../reducers/rootReducer";
import {FaArrowDown, FaArrowUp} from "react-icons/fa";
export default function Comment({state :
    { ownerId ,  content , ownerImage , ownerName, postedDate, likesCount},
    props
}){
    // TODO MAKE CSS FOR COMMENTS
    const dispatch = props.posts.dispatch
    likesCount = likesCount ? likesCount : 0
    return (
        <section className="comment-placeholder" key={ownerId}>
            <div className="comment-profile-info">
              <div className="comment-first-row">
                <div className="comment-profile-info-box">
                  <img className="comment-profile-pick" src={ownerImage} alt="profile picture"/>
                  <h2 className="username">{ownerName}</h2>
                </div>
                <span >{postedDate}</span>
              </div>
              <div className="comment-second-row">
                <p className="comment-content">{content}</p>
                <div className="comment-like-div">
                  <p className="comment-likes-count">{`Likes: ${likesCount}`}</p>
                  <CustomHeart likedBool={false} customClickEvent = {() => console.log(1)}/>
                </div>
              </div>
                <div className="arrows">
                    <div className="arrows-icons">
                        {store.getState().comments.displayShowDown ? <FaArrowDown onClick={() => dispatch({type : 1,})}/> : null}
                        {store.getState().comments.displayShowUp ? <FaArrowUp onClick={() => dispatch({type : 2, })}/> : null}
                    </div>
                    {store.getState().comments.commentsCountLeft !== 0 ? <p className="comments-left">{store.getState().comments.commentsCountLeft} comments left</p> : null}
                </div>
            </div>
      </section>
    )
}