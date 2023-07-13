import React from 'react';
import "../style/Error.css";
import {NavLink} from 'react-router-dom';
export const Error = () => {
  return (
    <div className='err_pg'>
    <div className="e404">
        404
    </div> 
        <h1>we are sorry,page not found!</h1>
        <p>the page you are looking for might have been removed had its name changed or is temporarrily unavailable</p>
        <NavLink to='/' className='bc_hm'>Back to home Page</NavLink>
     </div>
  )
}
