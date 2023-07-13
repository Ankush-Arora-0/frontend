import React from 'react'

export const OrderCard = (props) => {
  return (
    <div>
        <div className='card_bdy' id='cd_bdy'>
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
        </div>
    </div>
    </div>
  )
}
