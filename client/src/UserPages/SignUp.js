import React, { useState,useEffect,useRef,useContext } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import logimg from '../images/userlogtransparent.png';
import InfoMessage from '../components/InfoMessage';
import '../styles/LandingPage.css';

//const Signup = (props) => {
const SignUp = (props) => {

    const [showToast,setShowToast]=useState(false)
    const [msg,setMsg]=useState('')
    const [type,setType]=useState('')
  const [credentials,setCredentials] =useState({name:"",email:"",phone_number:'',password:"",cpassword:""})
  

  let navigate=useNavigate();
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    
    const {name,email,phone_number,password,cpassword}=credentials

    if(password!=cpassword)
    {
      setShowToast(true);
        setMsg("Passwords do not match")
        setType("error")
        setTimeout(()=>{
          setShowToast(false)
        },1500)
      //props.showAlert("Passwords do not match","danger")
      return;
    }
    const user="user";
    console.log(user,name,email,phone_number,password);
    const response=await fetch("http://localhost:5000/api/auth/registeruser",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({user,name,email,phone_number,password})
      });
      const json=await response.json()
      console.log(json);
      if(json.success)
      {
        
        
        localStorage.setItem('token',json.authtoken);
        //localStorage.setItem('cat',category);
        

        //props.showAlert("Account Created Successfully","success")
        //if(user=="admin")
        //{
          localStorage.setItem('utype',"user");
           sessionStorage.setItem("reloaded", "false");
          navigate("/",{
          state: { signUpSuccess: true},
          replace: true, // optional: prevents back button returning to login
        });
        //}
        // else if(user=="student")
        // {
        //   localStorage.setItem('utype',"user");
        //   navigate("/",{
        //     state: { signUpSuccess: true },
        //     replace: true, // optional: prevents back button returning to login
        //   });
        // }
        
      }
      else{
          setShowToast(true);
        setMsg("Invalid Credentials")
        setType("error")
        setTimeout(()=>{
          setShowToast(false)
        },1500)
        //props.showAlert("Invalid Details","danger")
    }
}
    const onChange=(e)=>{
      setCredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <div className='mt-0 d-flex flex-column align-items-center justify-content-center' style={{backgroundColor:"#318CE7",height:'100vh'}}>
      <InfoMessage showToast={showToast} msg={msg} type={type}/>
      <form className='mt-3 mb-3 pt-4 px-3' onSubmit={handleSubmit} style={{backgroundColor:"white",borderRadius: '10px',width:'50vw'}} >
        <img src={logimg} className="center" style={{display:'block',margin:'0 auto',width:'100px'}}alt="..."/>
        <h2 className='mb-3' style={{textAlign:"center",width:'100%'}}>Sign Up</h2>
       <div className='mx-0' style={{display:'flex'}}>
        
        <div className="mb-3" style={{width:'100%'}}>
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange}  aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>

        </div>
        </div>
               <div className='mx-0' style={{display:'flex'}}>
        
         <div className="mb-3" style={{width:'100%'}}>
          <label htmlFor="phone_number" className="form-label">Phone Number</label>
          <input type="tel" className="form-control" id="phone_number" name="phone_number" onChange={onChange} aria-describedby="phoneHelp"/>
        </div>
         <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
        </div>

        </div>
               <div className='mx-0' style={{display:'flex'}}>
        
        <div className="mb-3" style={{width:'100%'}}>
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
        </div>
        </div>

        <button type="submit" className="btn btn-primary mb-2" style={{width:'50%',display:'block',margin:'auto'}} >Register</button>
          <p className="ms-0 mt-0 mb-5" style={{textAlign:'center'}}>
        Already have an account?{' '}
        <Link to="/login" style={{textDecoration:'underline'}}>
         Sign In
        </Link>

      </p>
      </form>
     
    </div>
    // <div className='container mt-5'>
    //   <InfoMessage showToast={showToast} msg={msg} type={type}/>
    //   <h2 className='ms-5'>Create an account to use Bus Reservation System</h2>
    //    <form onSubmit={handleSubmit}>
    //     <div className='mx-5' style={{display:'flex'}}>
        
    //     <div className="mb-3" style={{width:'100%'}}>
    //       <label htmlFor="name" className="form-label">Name</label>
    //       <input type="text" className="form-control" id="name" name="name" onChange={onChange}  aria-describedby="emailHelp"/>
    //     </div>
    //     <div className="mb-3 ms-3" style={{width:'100%'}}>
    //       <label htmlFor="email" className="form-label">Email address</label>
    //       <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
    //       <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    //     </div>
    //     <div className="mb-3 ms-3" style={{width:'100%'}}>
    //       <label htmlFor="phone_number" className="form-label">Phone Number</label>
    //       <input type="tel" className="form-control" id="phone_number" name="phone_number" onChange={onChange} aria-describedby="phoneHelp"/>
    //     </div>
    //     </div>
    //     <div className='mx-5' style={{display:'flex'}}>

    //     <div className="mb-3" style={{width:'100%'}}>
    //       <label htmlFor="password" className="form-label">Password</label>
    //       <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
    //     </div>
    //     <div className="mb-3 ms-3" style={{width:'100%'}}>
    //       <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    //       <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
    //     </div>
    //     <div className="mb-3 ms-3" style={{width:'100%'}}>
    //       <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
    //       <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
    //     </div>
    //     </div>
    //     {/* <div className='ms-5' style={{display:'flex'}}>
        
    //     </div> */}
    //     <button type="submit" className="ms-5 btn btn-primary">Sign Up</button>
    //      <p className="ms-5 mt-2 mb-5">
    //     Already have an account?{' '}
    //     <Link to="/login" style={{textDecoration:'underline'}}>
    //      Sign In
    //     </Link>
    //   </p>
    //   </form>
      

         
    // </div>
    
  )
}

export default SignUp
