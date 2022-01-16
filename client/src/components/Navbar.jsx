import "../styles/Navbar.css"
import {Link} from "react-router-dom"
export default function Navbar({isAuthenticated}){
    return (
            <nav className="Navbar">
                <Link to="posts">Chatter</Link>
                <div>
                    {isAuthenticated ? <>
                    <a href="/profile">My Profile</a>
                    <a href="/friends">My Friends</a>
                    <a href="/">Logout</a>
                </> : <>
                <Link to="register">Register</Link>
                <Link to="login">Login</Link>
                </>
                }
                </div>
            </nav>
    )
}