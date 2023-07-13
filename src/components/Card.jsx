import React, { useState } from 'react';
import Button from '@mui/material/Button';
import "../style/Card.css";
export const Card = (props) => {
  const [userData,setUserdata]=useState();
  const[cbuydisp,setCbuydisp]=useState("none");
  const [adVal,setAdval]= useState("");
  const[ops,setOps]=useState(1);
  const[qty,setQty]= useState(1);
  const[pstatus,setPstatus]=useState("Not Proccessed");
  const cartAdd =async()=>{
    try{
        const res = await fetch('https://ecommerce-bac.onrender.com/cart',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          credentials:"include",
          body:JSON.stringify({img:props.img,name:props.name,price:props.price,description:props.descrip})
        })
        const data = await res.text();
        if(res.status===401 || !data){
          window.alert('please login first');
        }
        else if(res.status===402){
          window.alert('Server error');
        }
        else if(res.status ===202){
          props.popStyle3();
          setTimeout(() => props.popStyle4(), 5000);
        }
        else{
          props.popStyle();
          setTimeout(() => props.popStyle2(), 5000);
        }
    }
    catch(error){
   
    }
  }
  const getNow = async()=>{
    try{
      const res = await fetch('https://ecommerce-bac.onrender.com/getdata',{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        },credentials:"include"
      })
      const data = await res.json();

      if(res.status===402){
        window.alert("server error");
      }
      else if(res.status===401){
        window.alert("Please login first");
      }
      else{
        setUserdata(data);
        cbuyItem();
      }
    }
    catch(err){
   
    }
  }
  const buyNow = async()=>{
    const date =  new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    try{
      const res  = await fetch('https://ecommerce-bac.onrender.com/orderhome',{
        method:"POST",
        headers:{
          'Content-Type':"application/json"
        },
        credentials:"include",
        body: JSON.stringify({name:userData.name,email:userData.email,date:date,qty:qty,time:time,status:pstatus,img:props.img,pname:props.name,price:props.price,description:props.descrip})
      })
      const data =await res.json();
      if(!data){
        window.alert("error");
      }
      else{
        setCbuydisp('none');
        setAdval("");
        setOps(1);
        window.alert("order confirmed")
      }
    }
    catch(err){
      
    }
  }
  const cbuyItem=()=>{
    setCbuydisp('block');
    setOps(0.5);
  }
  const qtyChange=(e)=>{
    const value= e.target.value;
    setQty(value);
  }
  const cancelBuy=()=>{
    setCbuydisp('none');
    setOps(1);
  }
  const adChang=(e)=>{
    const value = e.target.value;
    setAdval(value)
  }
  
  return (
    <div className='card' >
    <i style={{opacity:ops}}>
        <img src={props.img} alt="sorry could not fetch image" className="pro_img" />
        <span className="pro_name">{props.name}</span>
        <span className="pro_price">${props.price}</span>
        <p className="pro_des">{props.descrip}</p>
        <Button variant="contained" id="det_btn" onClick={getNow} style={{width:"130px"}}>Buy Now</Button>
        <Button variant="contained" id="add_btn" onClick={cartAdd}>Add to cart</Button></i>
        <div className="confrm_buy" style={{display:cbuydisp}}>
        <label htmlFor="qty">Qty</label>
        <select name="qty" id="qty" onChange={qtyChange}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        </select>
        <div className="addre">
          <label htmlFor="addre">Please enter your address</label>
            <textarea name="addre" id="addre" onChange={adChang} value={adVal}></textarea>
        </div>
        <Button variant="contained" id="buy_btn" onClick={buyNow} style={{width:"18vw"}}>Confirm Buy</Button>
        <Button variant="contained" id="rmv_btn" onClick={cancelBuy}>Cancel</Button>
        </div>
    </div>
  )
}
