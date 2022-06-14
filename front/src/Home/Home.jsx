import React, {useState, useEffect} from 'react';
import Items from '../Items/Items';
import Places from '../Places/Places';
import SingleItem from '../SingleItem/SingleItem';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Cart from '../Cart/Cart';
import Order from '../Order/Order';

const Home = (props) => {
  let [currentPage ,setCurrentPage] = useState("main");
  let [currentItem, setCurrentItem] = useState("");
  let [isLoading, setIsLoading] = useState(true);
  let [items, setItems] = useState([]);
  let [tempItems, setTempItems] = useState([]);
  let [cart, setCart] = useState([]);

  function addToCart(itemId){
    let tempCart = [...cart];
    tempCart.push(itemId);
    setCart(tempCart);
}
function removeFromCart(itemId){
  let tempCart = [...cart];
  tempCart.forEach((item, index)=>{
    if (item._id === itemId){
      tempCart.splice(index, 1);
    }
  setCart(tempCart)
  });
}

  useEffect(() => {
    fetch('//localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/menu')
        .then(response => response.json())
        .then(data => {
            setIsLoading(false);
            setItems(data.places);
            setTempItems(data.places);
        });
  }, []);
  
  function singularItem(item){
    setIsLoading(true);
    setCurrentItem(item);
    setCurrentPage("item");
    setIsLoading(false);

  }

  return (
    <div className='homePage'>
      <div className='homeSidebar'>
        <div className='homeSidebarLeft'>
          <div className='homeSidebarBtn'>
          <button onClick={()=>{setCurrentPage("main")}}>Pagrindinis puslapis</button>
          </div>
          <div className='homeSidebarBtn'>
          <button onClick={()=>{setCurrentPage("places")}}>Įstaigos</button>
          </div>
          <div className='homeSidebarBtn'>
          <button onClick={()=>{setCurrentPage("breakfast")}}>Pusryčių meniu</button>
          </div><div className='homeSidebarBtn'>
          <button onClick={()=>{setCurrentPage("lunch")}}>Pietų meniu</button>
          </div>
          <div className='homeSidebarBtn'>
          <button onClick={()=>{setCurrentPage("dinner")}}>Vakarienės meniu</button>
          </div>
          <div className='homeSidebarBtn'>
          <button onClick={()=>{setCurrentPage("allDishes")}}>Visi patiekalai</button>
          </div>
          <div className='homeSidebarBtn'>
          <button onClick={()=>{props.logout()}}>Atsijungti</button>
          </div>
        </div>
        <div className='homeSidebarRight'>
          <div className='homeSidebarCartBtn'>
            <button onClick={()=>{setCurrentPage("cart")}}><FontAwesomeIcon icon={faCartShopping} /></button>
          </div>
        </div>
      </div>
      {!isLoading ? 
      <div className='homeMain'>
        {currentPage==="main"&&
        <div>Main page</div>}
        {currentPage==="places"&&
        <Places/>}
        {currentPage==="breakfast"&&
        <Items items={items} menuType={"breakfast"} singularItem={singularItem} addToCart={addToCart}/>}
        {currentPage==="lunch"&&
        <Items items={items} menuType={"lunch"} singularItem={singularItem} addToCart={addToCart}/>}
        {currentPage==="dinner"&&
        <Items items={items} menuType={"dinner"} singularItem={singularItem} addToCart={addToCart}/>}
        {currentPage==="allDishes"&&
        <Items items={items} menuType={"all"} singularItem={singularItem} addToCart={addToCart}/>}
        {currentPage==="cart"&&
        <Cart cart={cart} removeFromCart={removeFromCart} setCurrentPage={setCurrentPage}/>}
        {currentPage==="item"&&
        <SingleItem currentItem={currentItem} currentUser={props.currentUser} addToCart={addToCart}/>}
        {currentPage==="checkout"&&
        <Order cart={cart} setCurrentPage={setCurrentPage}/>}
      </div>:<div></div>}
    </div>
  )
}

export default Home