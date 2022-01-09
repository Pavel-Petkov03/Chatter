import "./styles/App.css"

import  NavBar  from "./components/Navbar";
import {Route, Routes} from "react-router-dom"
import Login from "./components/Login";
import Register from "./components/Register";
import { Provider,} from "react-redux";
import {createStore} from "redux"
import rootReducer from "./reducers/rootReducer.js"
import { Board } from "./components/Board";


const store = createStore(rootReducer)


function App() {
  return (
    <Provider store={store}>
        <div className="App">
        <NavBar/>
        <Routes>
          <Route element={<Login/>} path="/login/"/>
          <Route element={<Register/>} path="/register/"/>
          <Route element={<Board/>} path="/board/"/>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
