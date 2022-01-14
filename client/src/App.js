import "./styles/App.css"

import  NavBar  from "./components/Navbar";
import {Route, Routes, Redirect} from "react-router-dom"
import Login from "./components/Login";
import Register from "./components/Register";
import { Provider,} from "react-redux";
import { Board } from "./components/Board";
import store from "./reducers/rootReducer"



function App() {
  return (
    <Provider store={store}>
        <div className="App">
        <NavBar/>
        <Routes >
          <Route element={<Login/>} path="/login/" />
          <Route element={<Register/>} path="/register/"/>
          <Route element={<Board/>} path="/profile/"/>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
