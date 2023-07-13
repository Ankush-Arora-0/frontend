import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

 const LogOut = (props) => {
    const navigate = useNavigate();
    const callLogoutPage = async()=>{
        try{
              const res = await fetch("https://ecommerce-bac.onrender.com/logout",{
                method:"GET",
                headers:{
                  'Content-Type': 'application/json',
                  Accept:"application/json"
                  
                },
                credentials:"include",
            })
              
              if(res.status!==201){
                throw new Error(res.error)
              }
              props.dispatch({type:"User" , payload:false});
              navigate('/login');
            }
            catch(er){
         
              
            }
          }
          
          useEffect(() => {
            callLogoutPage();
        
      },[])
  return (
    <div>Logout</div>
  )
}
export default LogOut;
