import React from 'react'
import {useState,useEffect} from 'react'
import {Link,useNavigate ,Navigate,useLocation} from 'react-router-dom'



function Login() {
    
    const location = useLocation();
    const [email,setEmail] = useState() 
    const [password,setPassword] = useState()
    const [style1,setStyle1] = useState('input')
    const [style2,setStyle2] = useState('input')
    const navigate = useNavigate(); 

    useEffect(() => {
        if(localStorage.auth){
            navigate("/home")
        }
      }, [])
    
    if(location.state==null){
        console.log("empty")
    }else{
        setEmail(location.state.email)
        setPassword(location.state.password)
    }

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
    function validationCheck (){
        if(email==''){
            setStyle1('inputErr')
            alert('email is empty')
            return 0
        }else if(password==''){
            setStyle2('inputErr')
            alert('password is empty')
            return 0
        }}

        async function onLogin(e){
            e.preventDefault();
            // form validation
            if(validationCheck()==0){
                return 
            }
            console.log(email,password)
        try{
             console.log("🟢 sending data" )
            let res = await fetch('/api/login',reqData)
            const jj = await res.json();
            console.log(res.status)
            if(res.status===200){
                console.warn(jj.message.firstName);
                console.warn(jj.message.lastName);
                console.warn(jj.message.email);
                console.warn(jj.message.mobileNo);
                localStorage.setItem('auth', true);
                localStorage.setItem('firstName',jj.message.firstName);
                localStorage.setItem('lastName',jj.message.lastName);
                localStorage.setItem('email',jj.message.email);
                localStorage.setItem('mobileNo',jj.message.mobileNo);
                navigate("/home");
            }else{
                alert(jj.message);
            }
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
        <form onSubmit={onLogin }>
            <div className='cont'>
            <label 
            htmlFor="">Email 
            </label>
            <input 
            className={style1}
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
            className={style2}
            placeholder='Enter Password'
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