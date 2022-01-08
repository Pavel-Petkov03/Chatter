import { FaHeart, FaRegHeart,} from "react-icons/fa"
export default function({likedBool, customClickEvent}){
    let Icon
    {Icon = likedBool ? FaHeart : FaRegHeart}
    return (
        <Icon color={likedBool ? "red" : "black"} onClick={ () => customClickEvent()}/>
    )
}