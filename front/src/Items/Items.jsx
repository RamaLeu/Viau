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
                <div>{item.name}</div>
                <div>{item.price}€</div>
                <div>{item.placeId}</div>
                {props.menuType === "all" && <div>{item.menu}</div>}
                <div><button onClick={(e)=>{props.singularItem(item)}}>Užsisakyti</button></div>
            </div>
        ))}
    </div>
  )
}

export default Items