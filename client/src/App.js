
import  NavBar  from "./components/Navbar";
import {Route, Routes} from "react-router-dom"
import "./styles/App.css"
import Login from "./components/Login";
import Register from "./components/Register";
function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route element={<Login/>} path="/login/"/>
        <Route element={<Register/>} path="/register/"/>
      </Routes>
    </div>
  );
}

export default App;
