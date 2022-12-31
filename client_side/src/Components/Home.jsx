import React,{componentDidMount} from 'react'
import {useState,useEffect}  from 'react'
import { useLocation,useNavigate } from 'react-router-dom';

function Home() {
  
  
  const location = useLocation()
  const navigate = useNavigate()
  const [email,setEmail] = useState("as");
  useEffect(() => {
    if(!localStorage.getItem("auth")){
      navigate("/login")
    }else{
      setEmail(localStorage.getItem("email"))
    }
  }, [])



function logout(e){
  e.preventDefault();
  localStorage.clear();
  navigate("/login" );
  console.log("out");

}

  return (
    <div className='container'>
        <h1>-: Welcome Home {email} :-</h1>
        
        <button onClick={logout}>Logout</button>
    </div>
  )
}


export default Home