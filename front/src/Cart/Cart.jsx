import React from 'react';
import './Cart.css';

const Cart = (props) => {
  return (
    <div className='cartPage'>
        <div className='cartItemList'>
        {props.cart.map((item)=>(
            <div className='cartSingleItem'>
                <div className='cartSingleImage'>
                  <img src={item.img_url} alt="Nuotrauka"/>
                </div>
                <div className='cartSingleInfo'>
                  <div className='cartSingleTextBold'>{item.name}</div>
                  <div className='cartSingleText'>{item.price}€</div>
                  <div className='cartSingleText'>{item.place}</div>
                  <div className='cartSingleCount'>{item.count}</div>
                </div>
                <div className='cartSingleRemove'><button onClick={()=>{props.removeFromCart(item._id)}}>Pašalinti</button></div>
                </div>
        ))}
        {props.cart.length !== 0 ?<button onClick={()=>{props.setCurrentPage("checkout")}} className="cartOrderBtn">Užsakyti</button>: <span className='cartNothing'>Krepšelyje nieko nera</span>}
        </div>
    </div>
  )
}

export default Cart