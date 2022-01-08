import "../styles/Comment.css"
import CustomHeart from "./CustomHeart"
export default function Comment({
  
    ownerId ,  content , ownerImage , ownerName, postedDate, likesCount
}){
    // TODO MAKE CSS FOR COMMENTS
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
              
            </div>
      </section>
    )
}