import "../styles/Comment.css"
export default function Comment({
    ownerId ,  content , ownerImage , ownerName, postedDate
}){
    // TODO MAKE CSS FOR COMMENTS 
    return (
        <section class="comment-placeholder" key={ownerId}>
        <article class="comment-text">
          <div className="comment-let-content">
            <div className="comment-profile-info">
              <img class="comment-profile-pick" src={ownerImage} alt="profile picture"/>
              <h2 class="username">{ownerName}</h2>
            </div>
          <p class="comment">{content}</p>
          </div>
        </article>
        <span >{postedDate}</span>
      </section>
    )
}