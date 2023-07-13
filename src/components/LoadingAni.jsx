import React from 'react'
import "../style/Loading.css";
import loading from "../images/loading.png"

export const LoadingAni = () => {
    
  return (
    <div className='loading_page'>
    
        <img src={loading} alt= "Loading..." />
 
    </div>
  )
}
