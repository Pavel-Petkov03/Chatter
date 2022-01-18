import "./styles/App.css"

import  NavBar  from "./components/Navbar";
import {Route, Routes} from "react-router-dom"
import Login from "./components/Login";
import Register from "./components/Register";
import { Board } from "./components/Board";
import {connect} from "react-redux"
import { createPost, deletePost, getPosts, patchPost } from "./actions/posts.js"
import CustomModal from "./components/Modals/CustomModal";


function App(props) {
  console.log(props)
  return (
      <div className="App"> 
         <CustomModal/>
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
  return {
    posts : {
      get : dispatch(getPosts()),
      post : dispatch(createPost()),
      patch : dispatch(patchPost()),
      delete : dispatch(deletePost())
    }
  }
}

const mapMergeToProps = (stateProps , dispatchProps) => {
  return [...Object.entries(stateProps)].reduce((acc , [k , v]) => Object.assign(acc,  {[k] : {dispatch : dispatchProps[k], state: v}}), {})
}

export default connect(mapStateToProps, mapDispatchToProps, mapMergeToProps)(App)
