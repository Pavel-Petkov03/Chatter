import "../styles/Comment.css"
export default function Comment({
    ownerId ,  content , ownerImage , ownerName
}){
    // TODO MAKE CSS FOR COMMENTS 
    return (
        <li class="comment-object">
        <div class="comment-text">
          <div className="comment-let-content">
            <div className="comment-profile-info">
              <img class="comment-profile-pick" src="https://pbs.twimg.com/profile_images/675393797799460865/N58WAkoH.jpg" alt="profile picture"/>
              <h2 class="username">Obi Wan Kenobi </h2>
            </div>
          <p class="comment">Think Anakin might be just a bit evil </p>
          </div>
        </div>
        <span class="muted">&#183; 3 hours ago</span>
      </li>
    )
}