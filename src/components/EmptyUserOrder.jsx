import React from 'react'
import { NavLink } from 'react-router-dom';

export const EmptyUserOrder = () => {
  return (
    <div className='empty_cont' id='ordr_empty'>
    <h1> No Shopping Done Yet 😢</h1>  
    <NavLink to="/" className="shop_now">Shop Now</NavLink>
</div>
    )
}
