import React from 'react'
import {useState ,useEffect} from 'react'
import {Link,useNavigate, Navigate} from 'react-router-dom'



const Register=()=> {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [mobileNo,setMobileNo] = useState('')
    const [style1,setStyle1] = useState('input')
    const [style2,setStyle2] = useState('input')
    const [style3,setStyle3] = useState('input')
    const [style4,setStyle4] = useState('input')
    const [style5,setStyle5] = useState('input')
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
    function validationCheck (){
        if(firstName==''){
            setStyle1('inputErr')
            alert('FirstName is empty')
            return 0
        }else if(lastName==''){
            setStyle2('inputErr')
            alert('LastName is empty')
            return 0
        }else if(email==''){
            setStyle3('inputErr')
            alert('Email is empty')
            return 0
        }else if(password==''){
            setStyle4('inputErr')
            alert('Password is empty')
            return 0
        }else if(mobileNo==''){
            setStyle5('inputErr')
            alert('Mobileno is empty')
            return 0
        }
    }

        async function register(e){
            e.preventDefault();
            //Validations
            if(validationCheck()==0){
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
            alert(jj.message+"\n Navigate to Login page!")
            navigate("/login")
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
        className={style1}
        placeholder='Enter FirstName'
        value={firstName}
        onChange={(e)=>{
            setFirstName(e.target.value)
        }}/>
        </div>

        <div className='cont'>
        <label htmlFor="">LastName </label>
        <input type="text" 
        className={style2}
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
        className={style3}
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
        className={style4}
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
        className={style5}
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