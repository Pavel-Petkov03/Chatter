import "../styles/Post.css"


export default function Post({
    userImage, username, postImg , content, 
}){
    const currentImg = userImage ? userImage  : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
    return (
        <article className="post">
            <div className="name-row">
                <img src={currentImg} alt="" className="name-row-img"/>
                <h5 className="name-row-name">{username}</h5>
            </div>
            
            <div className="post-content">
                <img src={postImg} alt="" className="post-image"/>
                <div className="post-footer">
                    <p className="post-content-text">{content}</p>
                    <div className="post-buttons">
                        <button>Like</button>
                        <button>Comment</button>
                    </div>
                 </div>
            </div>
        </article>
    )
}