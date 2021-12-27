import "../styles/Comment.css"
import CustomHeart from "./CustomHeart"
export default function Comment({
  
    ownerId ,  content , ownerImage , ownerName, postedDate, likesCount
}){
    // TODO MAKE CSS FOR COMMENTS 
    return (
        <section class="comment-placeholder" key={ownerId}>
            <div className="comment-profile-info">
              <div className="comment-first-row">
                <div className="comment-profile-info-box">
                  <img class="comment-profile-pick" src={ownerImage} alt="profile picture"/>
                  <h2 class="username">{ownerName}</h2>
                </div>
                <span >{postedDate}</span>
              </div>
              <div className="comment-second-row">
                <p class="comment-content">{content}</p>
                <div>
                  <p>Likes: {likesCount}</p>
                  <CustomHeart likedBool={false}></CustomHeart>
                </div>
              </div>
              
            </div>
      </section>
    )
}