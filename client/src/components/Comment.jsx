
export default function Comment({
    ownerId ,  content , ownerImage , ownerName
}){
    // TODO MAKE CSS FOR COMMENTS 
    return (
        <div className="comment" key={ownerId}>
            <img src={ownerImage} alt="" />
            <p>{ownerName}:{content}</p>
        </div>
    )
}