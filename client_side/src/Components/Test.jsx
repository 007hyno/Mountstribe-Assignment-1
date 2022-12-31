import React from 'react'
import {useState} from 'react'
import {Link, useLocation} from 'react-router-dom'



function Test() {
    
    const [email,setEmail] = useState('test@gmail.com') //initialized with email and pass for succesfull login
    const [str,setStr] = useState()
    const [password,setPassword] = useState('test@s.com')
    const location = useLocation()
    alert(location.state)

      var jsonData ={    
        "email": email
        ,"password": password
    }
    const reqData = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(jsonData)
    };
        async function login(e){
            console.log("😁😚");
            e.preventDefault();
            console.log(email,password)
try{
    console.log("🟢 sending data" )
        let res = await fetch('/api/test',reqData)
        const jj = await res.json();
        console.log(res.status)
        console.log(jj.test);
        setStr(jj.test) 
    }
    catch(e){
        console.log("🔴 "+e)
    }
}

  return (
    <div className='container'>
        <div className='form-cont'>
        <h1 className='center-text'>{!str?"loding..":str}</h1>
        <form >
            <div className='cont'>
            <label 
            htmlFor="">Email 
            </label>
            <input className='input-text'
            type="text"
            value={email}
            name='email'
            onChange={(e)=>{
                setEmail(e.target.value)
                }}/>
            </div>

            <div className='cont'>
            <label htmlFor="">Password </label>
            <input type="password"
            className='input-text' 
            name='password'
            value={password}
            onChange={(e)=>{
                setPassword(e.target.value)
            }}
            />
            </div>
            <Link to='/home' state={{email:"parasrawat@gmail.com"}} >Link here</Link>
            <div>
                <button type='submit'
                className='login-button'
                onClick={login}
                >Login</button>
            </div>
        </form>
        <p className='center-text'>Create an account <Link to="/register">Sign Up</Link></p>
    </div>
    </div>
  )
}

export default Test