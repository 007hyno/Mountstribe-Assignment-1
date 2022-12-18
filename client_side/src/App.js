import './App.css';
import Login from './Components/Login'
import React, {useState} from 'react'
import Register from './Components/Register'
import Home from './Components/Home'
import {BrowserRouter, Route,Routes,Link} from 'react-router-dom'

function App() {
const [auth,setAuth] = useState(false)
  return (
    <BrowserRouter>

    <Routes>
      <Route  path="login" element={<Login />}/>
      <Route  path="/" element={auth?(<Home />):(<Login/>)}/>
      <Route  path="register" element={<Register />}/>
      <Route  path="home" element={<Home />}/>
    </Routes>

    </BrowserRouter>
  );
}

export default App;
