
import  NavBar  from "./components/Navbar";
import {Route, Routes} from "react-router-dom"
import "./styles/App.css"
import Login from "./components/Login";
import Register from "./components/Register";
import Post from "./components/Post";
const obj = {
  "Pavel Petkov" : {
    username : "Pavel Petkov",
    postImg : "https://images.ctfassets.net/u0haasspfa6q/1uGsqwmSpOUN3ITzZ0akhp/7582e3072d2da76fdc3689527f808268/girl-in-the-sunset-on-some-rocks-on-the-water",
    content : "This is very interesting"
  },
  "Pavel Petkov1" : {
    username : "Pavel Petkove23",
    userImage : "https://images.ctfassets.net/u0haasspfa6q/1uGsqwmSpOUN3ITzZ0akhp/7582e3072d2da76fdc3689527f808268/girl-in-the-sunset-on-some-rocks-on-the-water",
    postImg : "https://play-lh.googleusercontent.com/FCzgw2YD80puDhwEAOsjYCZcbetxOu5CRx7VzEVJ0z1C_FjyHqOefGqkrijyLD_cHbx1",
    content : "This is very interesting"
  },
  "Pavel Petkov2" : {
    username : "Pavel Petkov1",
    postImg : "https://play-lh.googleusercontent.com/FCzgw2YD80puDhwEAOsjYCZcbetxOu5CRx7VzEVJ0z1C_FjyHqOefGqkrijyLD_cHbx1",
    content : "This is very interesting"
  },
}


function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route element={<Login/>} path="/login/"/>
        <Route element={<Register/>} path="/register/"/>
      </Routes>
      <div className="post-placeholder">
        {Object.values(obj).map(Post)}
      </div>
    </div>
  );
}

export default App;
