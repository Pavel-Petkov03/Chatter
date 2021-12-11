

function NavBar({isAuthenticated}){
    return (
        <nav>
            {isAuthenticated} ? <>
                <a href="/profile">My Profile</a>
                <a href="/friends">My Friends</a>
                <a href="#">Logout</a>
            </> : <>
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </>
        </nav>
    )
}