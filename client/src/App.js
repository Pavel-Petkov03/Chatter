import "./styles/App.css"

import  NavBar  from "./components/Navbar";
import {Route, Routes} from "react-router-dom"
import Login from "./components/Login";
import Register from "./components/Register";
import { Board } from "./components/Board";
import {connect} from "react-redux"
import {getPosts} from "./actions/posts.js"

function App(props) {
  return (
        <div className="App">
        <NavBar/>
        <Routes >
          <Route element={<Login/>} path="/login" />
          <Route element={<Register/>} path="/register"/>
          <Route element={<Board {...props}/>} path="/posts"/>
        </Routes>
      </div>
  );
}


const mapStateToProps = (store) => {
  const {posts , comments} = store
  return {posts , comments}
} 


const mapDispatchToProps = (dispatch) => {
  console.log(dispatch)
  return {
    post : {
      getPost : () => dispatch(getPosts())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
