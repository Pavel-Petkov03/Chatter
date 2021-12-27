import { useState } from "react"
import { FaHeart, FaRegHeart,} from "react-icons/fa"
export default function({likedBool}){
    let Icon
    const [liked , setIsLiked] = useState(likedBool)
    {Icon = liked ? FaHeart : FaRegHeart}
    return (
        <Icon color={liked ? "red" : "black"} onClick={() => setIsLiked(l => !l )}/>
    )
}