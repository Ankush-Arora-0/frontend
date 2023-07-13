import React, { useEffect, useState } from 'react';
import "../style/Admin.css";
import { NavLink } from 'react-router-dom';
import { AdmCard } from './AdmCard';
import m1 from "../images/mix1.jpg";
import { EmptyAdminOrder } from './EmptyAdminOrder';

export const Admin = () => {
  const[orderData,setOrderdata]=useState([{}])
  const allOrder=async()=>{
    try{
      const res = await fetch('http://localhost:5000/allorder',{
        method:'GET',
        headers:{
          'Content-Type':"application/json"

        },credentials:'include'
      })
      const data = await res.json();
    
      if(res.status!==201 || !data){
          window.alert('no order')
      }
      else if(data.toString()===""){
        setOrderdata(null);
      }
      else{
        // window.alert('orders')
        setOrderdata(data);
      }
    }
      catch(err){
     
      }
  }
  useEffect(()=>{
      allOrder();
   
  },[])
  return (
    <div className='ad_panl'>
        <div className="adm_lft">
        <div className="adm_lft_box">
            <h1>Admin Panel</h1>
            <NavLink to='/admin/crtprod' className='ad_llink'>Create Products</NavLink>
            <NavLink to='/' className='ad_llink'>Products</NavLink>
            <NavLink to='/admin' className='ad_llink'>Orders</NavLink>
        </div>
        </div>
        <div className="adm_rgt">
            <h1>All Orders</h1>
            {orderData===null? <EmptyAdminOrder></EmptyAdminOrder> : orderData.map((val,index)=>{
              return(<AdmCard stats={val.status} email={val.email} index = {index} buyer={val.name} date = {val.date} payment ='success' qty= {val.qty} img = {val.img} prodname = {val.pname} descrip = {val.description} price ={val.price}></AdmCard>)
            })}
        </div>
    </div>
  )
}
