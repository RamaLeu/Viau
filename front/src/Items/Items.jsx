import React, { useState, useEffect } from 'react';
import './Items.css';

const Items = (props) => {
  let [menuItems, setMenuItems] = useState(props.items);

  useEffect(() => {
    let tempList = [];
    if(props.menuType !== "all"){
      props.items.map((item)=>{
        if (item.menu === props.menuType){
          tempList.push(item);
        }
      });
    }else{
      tempList = props.items;
    };
    setMenuItems(tempList);
  }, [props.items]);
  return (
    <div className='itemFullList'>
        {menuItems.map((item)=>(
            <div className='foodItem'>
                <div className='foodItemImage'><img src={item.img_url} alt="IMG"/></div>
                <div className='foodItemName'>{item.name}</div>
                <div className='foodItemPrice'>{item.price}€</div>
                <div className='foodItemPlace'>{item.place}</div>
                {props.menuType === "all" && <div>{item.menu === "breakfast"&& "Pusryčiai"}{item.menu === "lunch"&& "Pietūs"}{item.menu === "breakfast"&& "Vakarienė"}</div>}
                <div className='foodItemOuterOrderBtn'>
                  <button onClick={()=>{props.addToCart(item)}} className="foodItemOrderBtn">Į krepšelį</button>
                  <button onClick={(e)=>{props.singularItem(item)}} className="foodItemOrderBtn">Užsisakyti</button>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Items