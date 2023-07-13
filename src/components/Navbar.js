import React, { useState } from 'react';
import "../style/Navbar.css";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Button from '@mui/material/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
export const Navbar = (props) => {
  
  const [serch, setSerch] = useState("");
  const [menu, setMenu] = useState(false);
  const [disp, setDisp] = useState("none")
  const navigate = useNavigate();
  const searchFilt = (e) => {
    const value = e.target.value;
    setSerch(value);
  }

  const srchFiltset = () => {
    props.dispatch({ type: 'filter', payload: serch })
    navigate("/");
    // setSerch("");
  }
  const openMenu = () => {
    setMenu(!menu);
    if (menu) {
      setDisp("flex")
    }
    else {
      setDisp("none")
    }
  }
  const Libar = () => {
    return (
      <>{props.width <= 900 ? <Menu /> : <p className='nav_lik'><NavLink className='nav_link' to='/'>Home</NavLink>

        <NavLink className='nav_link' to='/register'>Register</NavLink>
        <NavLink className='nav_link' to='/login'>login</NavLink>
      </p>}</>)
  }
  const Menu = () => {
    return (<><MenuIcon className='hamburger' onClick={openMenu}></MenuIcon></>)
  }
  const Lobar = () => {
    return (<>{props.width <= 900 ? <Menu /> :
      <p className='nav_lik'>
        <NavLink className='nav_link' to='/'>Home</NavLink>

        <NavLink className='nav_link' to='/logout'>LogOut</NavLink>
        {props.state1 === false ? <NavLink className='nav_link' to='/cart'>cart</NavLink> : <NavLink className='nav_link' to='/admin'>Admin</NavLink>}
      </p>}</>)
  }
  return (
    //Creating Navbar
    <div className='navbar'>
      <ShoppingCartOutlinedIcon id="app_logo"></ShoppingCartOutlinedIcon>
      <p className="app_name">Ecommerce App</p>
      <input type="text" className="nav_search" onChange={searchFilt} value={serch} placeholder='Search' />
      <Button variant="contained" id="nav_btn" onClick={srchFiltset}>Search</Button>
      <SearchRoundedIcon id="nav_btn_icon" onClick={srchFiltset}></SearchRoundedIcon>
      {props.state === false ? <Libar></Libar> : <Lobar></Lobar>}

      <div className="menuitems" style={{ display: disp }}>
        {props.state === false ? <>
          <NavLink className='nav_link1' to='/'  >Home</NavLink>
          <NavLink className='nav_link1'  id='l2link' to='/register'>Register</NavLink>
          <NavLink className='nav_link1'  id='l2link' to='/login'>LogIn</NavLink>
        </> : <>
          <NavLink className='nav_link1'  to='/'>Home</NavLink>
          <NavLink className='nav_link1'  id='l2link' to='/logout'>LogOut</NavLink>
          {props.state1 === false ? <NavLink  className='nav_link1' id='l3link' to='/cart'>cart</NavLink> : <NavLink  className='nav_link1' id='l3link' to='/admin'>Admin</NavLink>}</>
        }</div>

    </div>
  )
}
