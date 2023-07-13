import React from 'react';
import '../style/Registration.css';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import LockIcon from '@mui/icons-material/Lock';
import LanIcon from '@mui/icons-material/Lan';
import { useState } from 'react';
import tech_img from '../images/tech.jpg'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export const Registration = () => {
  const navigate = useNavigate();

  const [fData, setFdata] = useState({
    fName: "",
    email: "",
    pnumber: "",
    profes: "",
    pass: "",
    cpass: ""

  });

  const inpData = (e) => {
    let name = e.target.name;
    let val = e.target.value;

    return (
      setFdata((oldItems) => {

        if (name === 'fName') {
          return {
            fName: val,
            email: oldItems.email,
            pnumber: oldItems.pnumber,
            profes: oldItems.profes,
            pass: oldItems.pass,
            cpass: oldItems.cpass
          }
        }
        else if (name === 'email') {
          return {
            fName: oldItems.fName,
            email: val,
            pnumber: oldItems.pnumber,
            profes: oldItems.profes,
            pass: oldItems.pass,
            cpass: oldItems.cpass
          }
        }
        else if (name === 'pnumber') {
          return {
            fName: oldItems.fName,
            email: oldItems.email,
            pnumber: val,
            profes: oldItems.profes,
            pass: oldItems.pass,
            cpass: oldItems.cpass
          }
        }
        else if (name === 'profes') {
          return {
            fName: oldItems.fName,
            email: oldItems.email,
            pnumber: oldItems.pnumber,
            profes: val,
            pass: oldItems.pass,
            cpass: oldItems.cpass
          }
        }
        else if (name === 'pass') {
          return {
            fName: oldItems.fName,
            email: oldItems.email,
            pnumber: oldItems.pnumber,
            profes: oldItems.profes,
            pass: val,
            cpass: oldItems.cpass
          }
        }
        else if (name === 'cpass') {
          return {
            fName: oldItems.fName,
            email: oldItems.email,
            pnumber: oldItems.pnumber,
            profes: oldItems.profes,
            pass: oldItems.pass,
            cpass: val
          }
        }

      }))
  }

  const handlePost = async (e) => {
    e.preventDefault();

    const { fName, email, pnumber, profes, pass, cpass } = fData;
    const res = await fetch('https://ecommerce-bac.onrender.com/register', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({ name: fName, email: email, phone: pnumber, work: profes, pass: pass, cpass: cpass })

    });
    const data = await res.text();
   

    if (res.status === 403 || !data) {
      window.alert("invalid registration");
   
    }
    else if (res.status === 401 || res.status === 402) {
      window.alert("invalid registration");
    
    }
    else {
      setFdata(() => {
        return {
          fName: "",
          email: "",
          pnumber: "",
          profes: "",
          pass: "",
          cpass: ""
        }
      })
      window.alert(" registration successfull");


      navigate("/login");
    }
  }
  return (
    <div className='reg_form'>
      <div className="left_reg">
        <h1>Sign up</h1>
        <form method='POST' onSubmit={handlePost}>
          <div className='set_logo'>
            <label htmlFor="fName" className='logo_icon' ><PersonIcon className='icons_logos' ></PersonIcon></label>
            <input type="text" id='fName' placeholder='Your Name' name='fName' className='inp' onChange={inpData} value={fData.fName} />
          </div>
          <div className='set_logo'>
            <label htmlFor="email" id='l-ico1' className='logo_icon' ><EmailIcon className='icons_logos'></EmailIcon></label>
            <input id='email' type="email" placeholder='Your Email' name='email' className='inp' onChange={inpData} value={fData.email} />
          </div>
          <div className='set_logo'>
            <label htmlFor="pnumber" id='l-ico2' className='logo_icon' ><CallIcon className='icons_logos'></CallIcon></label>
            <input id='pnumber' type="text" placeholder='Mobile Number' name='pnumber' className='inp' onChange={inpData} value={fData.pnumber} />
          </div>
          <div className='set_logo'>
            <label htmlFor="profes" id='l-ico3' className='logo_icon' ><LanIcon className='icons_logos'></LanIcon></label>
            <input id='profes' type="text" placeholder='Your profession' name='profes' className='inp' onChange={inpData} value={fData.profes} />
          </div>
          <div className='set_logo'>
            <label htmlFor="pass" id='l-ico4' className='logo_icon' ><LockIcon className='icons_logos'></LockIcon></label>
            <input id='pass' type="text" placeholder='Password' name='pass' className='inp' onChange={inpData} value={fData.pass} />
          </div>
          <div className='set_logo'>
            <label htmlFor="cpass" id='l-ico5' className='logo_icon' ><LockIcon className='icons_logos'></LockIcon></label>
            <input id='cpass' type="text" placeholder='Confirm Password' name='cpass' className='inp' onChange={inpData} value={fData.cpass} />
          </div>
          <Button variant="contained" id='f_sub' type='submit' >Submit</Button>
        </form></div>
      <div className="right_reg">
        <img src={tech_img} alt="Sorry" className='rgt_img' />
        <NavLink to='/login' className='rgt_link' >I am already a user</NavLink>
      </div>
    </div>
  )
}
