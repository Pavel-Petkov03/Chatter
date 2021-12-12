import "../styles/Navbar.css"

export default function Navbar({isAuthenticated}){
    return (
        <nav className="Navbar">
            <a href="/profile">Chatter</a>
            <div>
            {isAuthenticated ? <>
                <a href="/profile">My Profile</a>
                <a href="/friends">My Friends</a>
                <a href="/">Logout</a>
            </> : <>
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </>}
            </div>
        </nav>
    )
}