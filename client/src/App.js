
import  NavBar  from "./components/Navbar";
import {Route, Routes} from "react-router-dom"
import "./styles/App.css"
import Login from "./components/Login";
import Register from "./components/Register";
import Post from "./components/Post";
const obj = {
  "Pavel Petkov" : {
    username : "Pavel Petkov",
    userImg : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHksLYKdd696lVE2GXY5P4AUdWPlFCuiyD1g&usqp=CAU",
    postImg : "https://play-lh.googleusercontent.com/FCzgw2YD80puDhwEAOsjYCZcbetxOu5CRx7VzEVJ0z1C_FjyHqOefGqkrijyLD_cHbx1",
    content : "This is very interesting"
  },
  "Pavel Petkov1" : {
    username : "Pavel Petkove23",
    userImg : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHksLYKdd696lVE2GXY5P4AUdWPlFCuiyD1g&usqp=CAU",
    postImg : "https://play-lh.googleusercontent.com/FCzgw2YD80puDhwEAOsjYCZcbetxOu5CRx7VzEVJ0z1C_FjyHqOefGqkrijyLD_cHbx1",
    content : "This is very interesting"
  },
  "Pavel Petkov2" : {
    username : "Pavel Petkov1",
    userImg : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHksLYKdd696lVE2GXY5P4AUdWPlFCuiyD1g&usqp=CAU",
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
