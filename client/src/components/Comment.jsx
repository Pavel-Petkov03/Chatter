import "../styles/Comment.css"
export default function Comment({
    ownerId ,  content , ownerImage , ownerName
}){
    // TODO MAKE CSS FOR COMMENTS 
    return (
        <li class="comment-object">
        <div class="image-container">
          <img class="comment-profile-pick" src="https://pbs.twimg.com/profile_images/675393797799460865/N58WAkoH.jpg" alt="profile picture"/>
        </div>
        <div class="comment-text">
          <h2 class="username">Obi Wan Kenobi <span class="muted">&#183; 3 hours ago</span></h2>
          <p class="comment">Think Anakin might be just a bit evil </p>
        </div>
      </li>
    )
}