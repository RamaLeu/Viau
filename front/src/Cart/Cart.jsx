import React from 'react';
import './Cart.css';

const Cart = (props) => {
  return (
    <div className='cartPage'>
        CART
        <div className='cartItemList'>
        {props.cart.map((item)=>(
            <div className='cartSingleItem'>
                <div className='cartSingleInfo'>
                <div>{item.name}</div>
                <div>{item.price}€</div>
                <div>{item.placeId}</div>
                </div>
                <div className='cartSingleRemove'><button onClick={()=>{props.removeFromCart(item._id)}}>Pašalinti</button></div>
                </div>
        ))}
        <button onClick={()=>{props.setCurrentPage("checkout")}}>Užsakyti</button>
        </div>
    </div>
  )
}

export default Cart