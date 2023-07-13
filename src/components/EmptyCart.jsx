import React from 'react'
import { NavLink } from 'react-router-dom';
import "../style/EmptyCart.css";

export const EmptyCart = () => {
  return (
    <div className='empty_cont'>
        <h1>Your Cart is empty 😢</h1>
        <NavLink to='/' className='cart_home'>Add Products</NavLink>
    </div>
  )
}
