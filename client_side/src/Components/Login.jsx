import React from 'react'
import {useState,useEffect} from 'react'
import {Redirect,Link,useNavigate ,Navigate,useLocation} from 'react-router-dom'



function Login() {
    
    const location = useLocation();
    const [email,setEmail] = useState() 
    const [password,setPassword] = useState()

    useEffect(() => {
        if(localStorage.auth){
            navigate("/home")
        }
      }, [])
    
    if(location.state==null){
        console.log("khali")
    }else{
        setEmail(location.state.email)
        setPassword(location.state.password)
    }
    const navigate = useNavigate(); 

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
        async function onClick(e){
            e.preventDefault();
            // form validation
            if(email==''){
                alert('email is empty')
                return
            }else if(password==''){
                alert('passoword empty')
                return
            }
try{
    console.log("🟢 sending data" )
        let res = await fetch('/api/login',reqData)
        const jj = await res.json();
        console.log(res.status)
        if(res.status===200){
            localStorage.setItem('auth', true);
            localStorage.setItem('email',email);
            navigate("/home");
        }
        console.log(jj.test);
    }
    catch(e){
        console.log("🔴 "+e)
        alert("Error")
    }
}
  return (
    <div className='container'>
        <div className='form-cont'>
        <h1 className='center-text'>Login Page </h1>
        <form onSubmit={onClick }>
            <div className='cont'>
            <label 
            htmlFor="">Email 
            </label>
            <input 
            className='input-text'
            placeholder='Enter Email'
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
            placeholder='Enter Password'
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
                >Login</button>
            </div>
        </form>
        <p className='center-text'>Create an account <Link to="/register">Sign up</Link></p>
    </div>
    </div>
  )
}

export default Login