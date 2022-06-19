import React, {useState, useEffect} from 'react';
import './SinglePlace.css';

const SinglePlace = (props) => {
  let [placeMenu, setPlaceMenu] = useState([]);
  return (
    <div className='singlePlacePage'>
      <div className='singlePlaceTitle'>{props.pickedPlace.name}</div>
      <div className='singlePlaceImage'>
        <img src={props.pickedPlace.imgUrl} alt="Nuotrauka"></img>
        <div className='singlePlaceDesc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio dolores molestiae veritatis cumque deleniti pariatur sed repudiandae, mollitia tempore, facere laudantium consequatur voluptates vero error sint blanditiis fugiat quia veniam.</div>

      </div>
      <div className='singlePlaceItems'>
        {props.items.map((item)=>(
          item.placeId === props.pickedPlace._id &&
          <div className='placeFoodItem'>
                <div className='foodItemImage'><img src={item.img_url} alt="IMG"/></div>
                <div className='foodItemName'>{item.name}</div>
                <div className='foodItemPrice'>{item.price}€</div>
                <div>{item.menu === "breakfast"&& "Pusryčiai"}{item.menu === "lunch"&& "Pietūs"}{item.menu === "breakfast"&& "Vakarienė"}</div>
                <div className='foodItemOuterOrderBtn'>
                  <button onClick={()=>{props.addToCart(item)}} className="foodItemOrderBtn">Į krepšelį</button>
                  <button onClick={(e)=>{props.singularItem(item)}} className="foodItemOrderBtn">Užsisakyti</button>
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default SinglePlace