import React from 'react';
import '../style/Login.css';
import {NavLink,useNavigate} from 'react-router-dom';
import login_img from "../images/tech.jpg";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';
import { useState } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';

export const Login = (props) => {
  const  navigate = useNavigate();
  const [lData,setLdata]= useState({
    email:"",
    pass:""
  })

  const valChan = (e)=>{
    let name= e.target.name;
    let value = e.target.value;

      return(setLdata((oldItems)=>{
        if (name==='email'){
          return{
            email:value,
            pass:oldItems.pass
          }
        }
        else{
          return{
            email:oldItems.email,
            pass: value
          }
        }
      }))
  }
  const loginHand = async (e) =>{
      e.preventDefault();
      const{email,pass} = lData;
      try{
      const res = await fetch('http://localhost:5000/login',{
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
  
      },
      body: JSON.stringify({email:email,pass:pass}),
      credentials:"include"
  });
  const data =  await res.text();
  if(res.status===402 ||!data){
    window.alert("Please Register");
  }
  else if(res.status===401){
    window.alert("Invalid Credentials");
  }
  else if(res.status===403){
    window.alert("Server Error");
  }
  else{
    setLdata(()=>{
      return{
        email:"",
        pass:""
      }
    })
    props.dispatch({type:"User" , payload:true});
    if(res.status===200){
      window.alert("Login Admin");
      props.dispatch1({type:'admin',payload:true});
      navigate('/admin');

    }
    if(res.status===201){
      window.alert("Login successfull");
      props.dispatch1({type:'admin',payload:false});
      navigate("/")

    }

  }

    }catch(err){
      
    }
  }


  return (
    <div className='lgn_form'>
      <div className="lft_data">
        <img src={login_img} className='lft_img' alt="Sorry" />
        <NavLink to='/signin' className='lft_link1'>Create an account</NavLink>
      </div>
      <div className="rgt_data">
      <h1>Sign in</h1>
      <form method='POST' onSubmit={loginHand}>
      <div className='set_logo'>
      <label htmlFor="email" className='logo_icon1'  id='l-icoo1'><PersonIcon className='icons_logos' ></PersonIcon></label>
        <input type="email" id='email' placeholder='Your Email'  autoComplete='off' name='email' className='inp' onChange={valChan}  value={lData.email} />
        </div>
        <div className='set_logo'>
        <label htmlFor="pass"  id='l-icoo4'  className='logo_icon1' ><LockIcon className='icons_logos'></LockIcon></label>
        <input id='pass' type="text" placeholder='Password'  autoComplete='off' name='pass' className='inp' onChange={valChan} value={lData.pass}   />
        </div>
        <Button variant="contained" id='l_sub' type='submit'>Log in</Button>
      </form>

      <p className='ot_lg'>Or login with <FacebookIcon id='fa_ico'></FacebookIcon> <TwitterIcon id='tw_ico'></TwitterIcon> <GoogleIcon id='gg_ico'></GoogleIcon></p>
      </div>
    </div>
  )
}
