import './App.css';
import Login from './Components/Login'
import React, {useState} from 'react'
import Register from './Components/Register'
import Home from './Components/Home'
import Test from './Components/Test'
import {BrowserRouter, Route,Routes,Link,Navigate} from 'react-router-dom'

function App() {
const [auth,setAuth] = useState(false)
  return (
    <BrowserRouter>

    <Routes>
      <Route  path="login" element={<Login />}/>
      <Route  path="/" element={auth?(<Home />):(<Test/>)}/>
      <Route  path="register" element={<Register />}/>
      <Route  path="home" element={<Home />}/>


      <Route  path="test" element={<Test />}/>  

      <Route  path="/re" element={<Navigate to="/test" state={{name:"propes :)"}} />}/>
    </Routes>

    </BrowserRouter>
  );
}

export default App;
