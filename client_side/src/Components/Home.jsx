import React from 'react'
import {useState,useEffect}  from 'react'
import { useLocation,useNavigate } from 'react-router-dom';

function Home() {
  
  
  const location = useLocation()
  const navigate = useNavigate()
  const [email,setEmail] = useState("");
  const [firstName,setfirstName] = useState("");
  const [lastName,setlastName] = useState("");
  const [mobileNo,setmobileNo] = useState("");
  const [temp,setTemp] = useState("s");
  const [city,setCity] = useState();
  const API_KEY = process.env.REACT_APP_API_KEY  

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position)=>{
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(response => console.log(setTemp((response.main.temp-273.15).toFixed(2)),setCity(response.name)))
        .catch(err => console.error(err));
    })

    if(!localStorage.getItem("auth")){
      navigate("/login")
    }else{
      setEmail(localStorage.getItem("email"))
      setfirstName(localStorage.getItem("firstName"))
      setlastName(localStorage.getItem("lastName"))
      setmobileNo(localStorage.getItem("mobileNo"))
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
      <div className='contVer'>

        <h1 className='title tape1 tapeClr2'>-: Welcome :-</h1>
        <div className='profileDetCont'>
          <p className='title tb'>User Details</p>
        <p className='title tapeClr4 tape3'>FirstName: {firstName?firstName:"loading.."}</p>
        <p className='title tapeClr4 tape3'>LastName: {lastName?lastName:"loading.."}</p>
        <p className='title tapeClr4 tape3'>Email: {email?email:"loading.."}</p>
        <p className='title tapeClr4 tape3'>Mobile: {mobileNo?mobileNo:"loading.."}</p>
        <p>Temperature is {temp?temp+"°C":"loading..."} in {city?city:"loading.."}</p>
        </div>
        <button className='login-button' onClick={logout}>Logout</button>
      </div>
    </div>
  )
}


export default Home