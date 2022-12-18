import React from 'react'
import {useState} from 'react'
import {Redirect,Link} from 'react-router-dom'



function Login() {
    
    const [email,setEmail] = useState('test@gmail.com')
    const [password,setPassword] = useState('test@gmail.com')

      var jsonData ={    
        "email": "req.body.email",
            "password": "hashedPassword"
    }
        async function login(e){
            e.preventDefault();
            const requestOptions = {
                method: 'POST',
                crossorigin: true,  
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jsonData)
            };

        console.warn(email,password)

        let res = await fetch('http://localhost:3001/api/login',requestOptions)
        const da = await res.text();
        console.log("da😀"+ da)
        res = await res.text();
        console.log("😀"+ res)
        console.log("a"+JSON.stringify(res))
        res = await JSON.stringify(res);
        alert(JSON.stringify(res))

        }
  return (
    <div className='container'>
        <div className='form-cont'>
        <h1 className='center-text'>Login Page</h1>
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

export default Login