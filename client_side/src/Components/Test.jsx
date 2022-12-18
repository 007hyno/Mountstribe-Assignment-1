import React from 'react'
import {useState} from 'react'
import {Link} from 'react-router-dom'



function Test() {
    
    const [email,setEmail] = useState('test@gmail.com') //initialized with email and pass for succesfull login
    const [password,setPassword] = useState('test@gmail.com')

      var jsonData ={    
        "email": email,
            "password": password
    }
        async function login(e){
            e.preventDefault();
            const reqData = {
                method: 'POST',
                crossorigin: true,  
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: "JSON.stringify(jsonData)"
            };

        console.warn(email,password)
try{
    console.log("🟢 sending data" )
        let res = await fetch('http://localhost:3001/api/login',reqData)
        const data_res = await res.text();
        console.log("🟢 "+res.email)
    }
    catch(e){
            console.log("🔴 "+e)
    }

        }
  return (
    <div className='container'>
        <div className='form-cont'>
        <h1 className='center-text'>Test Page</h1>
        <form >
            <div className='cont'>
            <label 
            htmlFor="">Email 
            </label>
            <input 
            className='input-text'
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