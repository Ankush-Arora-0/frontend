import { CartCard } from './CartCard';
import "../style/Cart.css"
import { useEffect, useState } from 'react';
import { EmptyCart } from './EmptyCart';
import { NavLink } from 'react-router-dom';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { LoadingAni } from './LoadingAni';

export const Cart = () => {
  const [cData, setCdata] = useState([])
  const [cuData1, setCudata1] = useState({
    email:"",
    phone:""
  })
  const [cuData, setCudata] = useState("");
  const [cData1, setCdata1] = useState("");
  const [posit, setPosit] = useState("0px");
  const [popScale, setPopscale] = useState("scale(0.01)");
  const [animateLine, setAnimateLine] = useState(false);
  const popStyle = () => {

    var scrollPosition = window.scrollY;
    setPosit(scrollPosition + 50 + "px");
    setPopscale("scale(1)");
    setAnimateLine(true);

  }
  const popStyle2 = () => {
    setPosit("0px");
    setPopscale("scale(0.01)");
    setAnimateLine(false);
    uCartdata();
  }
  const uCartdata = async () => {
    try {
      const res = await fetch('http://localhost:5000/cartdata', {
        method: 'GET',
        headers: {
          'Content-Type': "application/json"
        },
        credentials: "include"
      })

      const data = await res.json();

      if (res.status === 401 || !data) {
        window.alert('no data found')
      }
      else if (res.status === 402) {
        window.alert('server error');
      }
      // else if(){
      //   setCdata(null);
      // }
      else {
        setCdata(data.cartitems);
        setCdata1("h");
        setCudata(data.name);
        setCudata1(()=>{
          return{
            email:data.email,
            phone:data.phone
          }
        });

      }
    }
    catch (err) {
    
    }
  }
  const uCartdata1 = async () => {
    try {
      const res = await fetch('http://localhost:5000/cartdata1', {
        method: 'GET',
        headers: {
          'Content-Type': "application/json"
        },
        credentials: "include"
      })

      const data = await res.text();
    
      if (data === "[]") {
        setCdata(null);
        setCdata1("h");
      }
      else {
        uCartdata();
      }

    }
    catch (err) {
  
    }
  }
  useEffect(() => {

    uCartdata1();
  }, [])
  return (
    <div className='cart_bdy'>
      <h1>My Cart</h1>
      <NavLink to='/myorders' className='my_order'>My orders</NavLink>
      <p className='cart_card_bdy'>
      {cData1.toString() === "" ? <LoadingAni></LoadingAni> : (cData === null ? <EmptyCart></EmptyCart> : cData.map((val, index) => {
        return (<CartCard email={cuData1.email} phone = {cuData1.phone} img={val.item.img} name={val.item.name} price={val.item.price} descrip={val.item.description} itemId={val._id} index={index} cname={cuData} popStyle={popStyle} popStyle2={popStyle2} />)
      }))}</p>
      <div className="pop_up" style={{ top: posit, transform: popScale, transition: "all 0.5s linear" }}>
        <CheckRoundedIcon style={{ color: "white", backgroundColor: "red", borderRadius: "30px", width: "30px", height: "30px", margin: "3px 5px" }}></CheckRoundedIcon>
        <span> Item Removed from cart</span>
        <div className={`line ${animateLine ? "animate-line" : ""}`} ></div>
      </div>
    </div>
  )
}
