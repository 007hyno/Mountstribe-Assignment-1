import React from 'react'
import {useState} from 'react'
import {Redirect,Link} from 'react-router-dom'



const Register=()=> {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [mobileNo,setMobileNo] = useState('')

    let handleSubmit = async(e) => {
        // console.warn(email,password)
        e.preventDefault();
        // try {
            let res = await fetch('http://localhost:3001/api/register', {
                method: 'post',
                // withCredentials: true,  
                // crossorigin: true,  
                mode: 'no-cors',
                body: JSON.stringify({
                    "email":"email",
                    "password":"password",
                    "mobileNo":"mobileNo",
                    "firstName":"firstName",
                    "lastName":"lastName" 
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            res = await JSON.stringify(res);
            alert(res)
        //   if (res.status === 200) {
        //       alert("done")
        //     } else {
        //         alert("fail")
        //   }
        // } catch (err) {
        //   console.log("🔥d🔥"+err.response);
        // }
      }

  return (
    <div className='container'>
    <div className='form-cont'>
    <h1 className='center-text'>-: Register Page :-</h1>
    <form 
    onSubmit={handleSubmit}
    >
        <div className='cont'>
        <label htmlFor="">FirstName </label>
        <input type="text"
         value={firstName}
          onChange={(e)=>{
            setFirstName(e.target.value)
            }}/>
        </div>

        <div className='cont'>
        <label htmlFor="">LastName </label>
        <input type="text" 
        value={lastName}
        onChange={(e)=>{
            setLastName(e.target.value)
        }}
        />
        </div>
        <div className='cont'>
        <label htmlFor="">Email </label>
        <input type="email" 
        value={email}
        onChange={(e)=>{
            setEmail(e.target.value)
        }}
        />
        </div>
        <div className='cont'>
        <label htmlFor="">Password </label>
        <input type="password" 
        value={password}
        onChange={(e)=>{
            setPassword(e.target.value)
        }}
        />
        </div>
        <div className='cont'>
        <label htmlFor="">Mobile No. </label>
        <input type="text" 
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
    <p className='center-text'>Already have an account <Link to="/login">Sign Up</Link></p>

    </div>
    </div>
  )
}

export default Register