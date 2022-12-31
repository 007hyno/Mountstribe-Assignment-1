import React from 'react'
import {useState ,useEffect} from 'react'
import {Redirect,Link,useNavigate, Navigate} from 'react-router-dom'



const Register=()=> {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [mobileNo,setMobileNo] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.auth){
            navigate("/home")
        }
      }, [])

    var jsonData ={    
        "email": email,
        "password": password,
        "firstName":firstName,
        "lastName": lastName,
        "mobileNo": mobileNo
    }
    const reqData = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(jsonData)
    };
        async function register(e){
            e.preventDefault();
            //Validations
            if(firstName==''){
                alert('email')
                return
            }else if(lastName==''){
                alert('password is empty')
                return
            }else if(email==''){
                alert('firstname')
                return
            }else if(password==''){
                alert('lastname')
                return
            }else if(mobileNo==''){
                alert('mobileno')
                return
            }
            console.log(email,password,firstName,lastName,mobileNo)
try{
    console.log("🟢 sending data" )
        let res = await fetch('/api/register',reqData)
        const jj = await res.json();
        console.log(res.status)
        if(res.status===200){
            navigate("/login" );
            // navigate("/login",{state:{email:email,password:password}} );
        }else{
            alert(jj.message)
        }
    }
    catch(e){
        console.log("🔴 "+e)
    }
}

  return (
    <div className='container'>
    <div className='form-cont'>
    <h1 className='center-text'>-: Register Page :-</h1>
    <form 
    onSubmit={register}
    >
        <div className='cont'>
        <label htmlFor="">FirstName </label>
        <input type="text"
        placeholder='Enter FirstName'
        value={firstName}
        onChange={(e)=>{
            setFirstName(e.target.value)
        }}/>
        </div>

        <div className='cont'>
        <label htmlFor="">LastName </label>
        <input type="text" 
        placeholder='Enter LastName'
        value={lastName}
        onChange={(e)=>{
            setLastName(e.target.value)
        }}
        />
        </div>
        <div className='cont'>
        <label htmlFor="">Email </label>
        <input type="email" 
        placeholder='Enter Email'
        value={email}
        onChange={(e)=>{
            setEmail(e.target.value)
        }}
        />
        </div>
        <div className='cont'>
        <label htmlFor="">Password </label>
        <input type="password" 
        placeholder='Enter Password'
        value={password}
        onChange={(e)=>{
            setPassword(e.target.value)
        }}
        />
        </div>
        <div className='cont'>
        <label htmlFor="">Mobile No. </label>
        <input type="text" 
        placeholder='Enter Mobile Number'
        value={mobileNo}
        onChange={(e)=>{
            setMobileNo(e.target.value)
        }}
        />
        </div>
        
        <div>
            <button 
            className='login-button'
            type='submit'
            >Register</button>
        </div>
    </form>
    <p className='center-text'>Already have an account <Link to="/login">Login In</Link></p>

    </div>
    </div>
  )
}

export default Register