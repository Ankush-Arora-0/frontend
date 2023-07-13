import React, { useState } from 'react';
import "../style/CartCard.css";
import Button from '@mui/material/Button';

export const CartCard = (props) => {

  const [qty, setQty] = useState(1);
  const [pstatus, setPstatus] = useState("Not Proccessed");
  const [cbuydisp, setCbuydisp] = useState("none")
  const [adVal, setAdval] = useState("");
  const [ops, setOps] = useState(1);

  const rmvItem = async () => {
    try {
      const res = await fetch('https://ecommerce-bac.onrender.com/rmitem', {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ itemId: props.itemId, itemIndex: props.index })
      })
      const data = await res.text();
     
      if (!data) {
        window.alert("bad request")
      }
      else {
        props.popStyle();
        setTimeout(() => props.popStyle2(), 5000);
        // window.location.reload();
      }
    }
    catch (err) {
     
    }
  }
  const chekOut = async (amount) => {
    try {
      const date = new Date().toLocaleDateString();
      const time = new Date().toLocaleTimeString();
      const res = await fetch("https://ecommerce-bac.onrender.com/api/checkout", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({name: props.cname, email: props.email, date: date, qty: qty, time: time, status: pstatus, img: props.img, pname: props.name, price: props.price, description: props.descrip})
      })
      const data = await res.json()

      
      const options = {
        key: data.key_id, // Enter the Key ID generated from the Dashboard
        amount: data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Ankush Goomber",
        description: "Test Transaction",
        image: "https://avatars.githubusercontent.com/u/127427325?s=400&u=97a69d0a486469c080526511efdd58b0d7172ae1&v=4",
        order_id: data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "https://ecommerce-bac.onrender.com/api/paymentverification", 
        prefill: {
          name: props.cname,
          email: props.email,
          contact: props.phone
        },
        notes: {
          "address": "Razorpay Corporate Office"
        },
        theme: {
          "color": "#000000"
        }
      };
     
      const razor = new window.Razorpay(options);
        razor.open();
      
      
    }
    catch (err) {
     
    }
  }
  const cbuyItem = () => {
    setCbuydisp('block');
    setOps(0.5);
  }
  const qtyChange = (e) => {
    const value = e.target.value;
    setQty(value);
  }
  const cancelBuy = () => {
    setCbuydisp('none');
    setOps(1);
  }
  const adChang = (e) => {
    const value = e.target.value;
    setAdval(value)
  }
  return (
    <div className='card' id='card_bdy'>
      <i style={{ opacity: ops }}>
        <img src={props.img} alt="sorry could not fetch image" className="pro_img" />
        <span className="pro_name">{props.name}</span>
        <span className="pro_price">${props.price}</span>
        <div className="pro_des">{props.descrip}</div>
        <Button variant="contained" id="buy_btn" onClick={cbuyItem}>Buy Now</Button>
        <Button variant="contained" id="rmv_btn" onClick={rmvItem}>Remove</Button></i>
      <div className="confrm_buy" style={{ display: cbuydisp }}>
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
        <Button variant="contained" id="buy_btn" onClick={() => { chekOut(props.price) }}>Confirm Buy</Button>
        <Button variant="contained" id="rmv_btn" onClick={cancelBuy}>Cancel</Button>
      </div>
    </div>
  )
}
