import React, { useState } from 'react';
import "../style/AdminCard.css";


export const AdmCard = (props) => {
    const [statuss,setStatuss]=useState("");
    const changeStatus=async(stats)=>{
        try{
            const res = await fetch('http://localhost:5000/upstatus',{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                }
                ,credentials:'include',
                body:JSON.stringify({email:props.email,status:stats})
            })
            const data =await res.text();
            window.location.reload();
        }
        catch(err){
        }
    }
    const statusVal=async(e)=>{
        const val = e.target.value;
        
        setStatuss(val);
         changeStatus(val);
    }
  return (
    <div className='card_bdy'>
        <div className="card_nav">
            <span className="nav_el">#</span>
            <span className="nav_el">Status</span>
            <span className="nav_el">Buyer</span>
            <span className="nav_el">Date</span>
            <span className="nav_el">Payment</span>
            <span className="nav_el">Qty</span>
        </div>
        <hr />
        <div className="nav_an">
        <span className="nav_el">{props.index+1}</span>
        <span className="nav_el">{props.stats}</span>          
        <span className="nav_el">{props.buyer}</span>
        <span className="nav_el">{props.date}</span>
        <span className="nav_el">{props.payment}</span>
        <span className="nav_el">{props.qty}</span>
        </div>
        <hr />
        <hr />
        <div className="card_bdydet">
            <img src={props.img} alt="" className="bdydet_img" />
            
            <div className="crd_prdbox">
            <p className="crd_prd_" style={{fontWeight:"bold"}}>{props.prodname}</p>
            <p className="crd_prd_">{props.descrip}</p>
            <p className="crd_prd_" style={{fontWeight:"bold" ,color:"green"}}>${props.price}</p>
            </div>
            <h3>Update Status</h3>
            <select name="status" id="status" className='statuschk' onChange={statusVal}> 
            <option value="not processed">Not Processed</option>
            <option value="shipped">Shipped</option>
            <option value="delieverd">Delievered</option>
            <option value="canceled">Canceled</option>
            </select>
        </div>
    </div>
  )
}
