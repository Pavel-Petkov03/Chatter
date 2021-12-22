import "../styles/LoginAndRegister.css"
export default function Register(){
    return (
        <div className="Register">
            <h1>Register</h1>
            <form action="" className="form">
                <input type="text" placeholder="Username" />
                <input type="text" placeholder="Email"/>
                <input type="text" placeholder="Password"/>
                <input type="text" placeholder="Confirm Password"/>
               <button>Submit</button>
            </form>
        </div> 
    )
}