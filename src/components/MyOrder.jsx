import React, { useEffect } from 'react';
import { useState } from 'react';
import { OrderCard } from './OrderCard';
import "../style/MyOrder.css";
import { LoadingAni } from './LoadingAni';
import { EmptyUserOrder } from './EmptyUserOrder';


export const MyOrder = () => {
    const [order,setOrder]=useState([]);
    const [order1,setOrder1]=useState(null);
    const myOrder = async()=>{
        try{
            const res = await fetch('https://ecommerce-bac.onrender.com/myorders',{
                method:"GET",
                headers:{
                    'Content-Type':'application/json'
                }
                ,credentials:'include',

            })
            const data = await res.json();
          
            if(data.toString()===""){
                setOrder1("h");
                setOrder(null);
            }
            else{
                setOrder1("h"); 
                setOrder(data);
            }

        }
        catch(err){
          
        }
    }
    useEffect(()=>{
        myOrder();
    },[])
  return (
    <div className='order_page'>
            <h1>My orders</h1>
            {}
        {order1 ===null?<LoadingAni></LoadingAni>:(order===null?<EmptyUserOrder></EmptyUserOrder>:
            order.map((val,index)=>{
                return (<OrderCard stats={val.status} email={val.email} index = {index} buyer={val.name} date = {val.date} payment ='success' qty= {val.qty} img = {val.img} prodname = {val.pname} descrip = {val.description} price ={val.price}/>)
            }))
        }
      
    </div>
  )
}
