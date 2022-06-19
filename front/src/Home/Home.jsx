import React, {useState, useEffect} from 'react';
import Items from '../Items/Items';
import Places from '../Places/Places';
import SingleItem from '../SingleItem/SingleItem';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCheck } from '@fortawesome/free-solid-svg-icons';
import Cart from '../Cart/Cart';
import Order from '../Order/Order';
import AdminOrders from '../Admin/AdminOrders';
import AdminFood from '../Admin/AdminFood';
import AdminPlaces from '../Admin/AdminPlaces';
import SinglePlace from '../SinglePlace/SinglePlace';

const Home = (props) => {
  let [currentPage ,setCurrentPage] = useState("main");
  let [currentItem, setCurrentItem] = useState("");
  let [isLoading, setIsLoading] = useState(true);
  let [items, setItems] = useState([]);
  let [tempItems, setTempItems] = useState([]);
  let [singlePickedPlace, setSinglePlace] = useState("");
  let [cart, setCart] = useState([]);
  let [addingAnim, setAddingAnim] = useState(false);

  function addToCart(itemId){
    let tempCart = [...cart];
    let isInCart = false;
    let itemData = {
      _id: itemId._id,
      name: itemId.name,
      price: itemId.price,
      place: itemId.place,
      img_url: itemId.img_url,
      count: 1,
    };
    if (tempCart.length >0){
      tempCart.forEach((item)=>{
        console.log(item._id);
        console.log(itemId._id);
        if (item._id === itemId._id){
          item.count += 1;
          isInCart = true;
        }
      });
    }else{
      tempCart.push(itemData);
      isInCart = true;
    }
    if(!isInCart){
      tempCart.push(itemData);
    }
    setCart(tempCart);
    setAddingAnim(true);
}
function removeFromCart(itemId){
  let tempCart = [...cart];
  tempCart.forEach((item, index)=>{
    if (item._id === itemId){
      tempCart.splice(index, 1);
    }
  setCart(tempCart);
  });
  
}

function removeCartAnim(){
  setAddingAnim(false);
  /* setAddingAnim(false); */
}

  useEffect(() => {
    if(addingAnim){
      setTimeout(removeCartAnim, 1000);
    }
  }, [addingAnim]);
  

  function fetchItems(){
    fetch('//localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/menu')
    .then(response => response.json())
    .then(data => {
        setIsLoading(false);
        setItems(data.places);
        setTempItems(data.places);
    });
  }

  useEffect(() => {
    fetchItems();
  }, []);
  
  function singularItem(item){
    setIsLoading(true);
    setCurrentItem(item);
    setCurrentPage("item");
    setIsLoading(false);

  }

  function singlePlace(place){
    setIsLoading(true);
    setSinglePlace(place);
    setCurrentPage("singlePlace");
    setIsLoading(false);
  }

  return (
    <div className='homePage'>
      {props.currentUser.type =="user"&& 
      <div className='homeSidebar'>
        <div className='homeSidebarLeft'>
          <span className='sidebarTitle'>VIAU</span>
          <div>
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
        </div>
      </div>}
      {props.currentUser.type =="admin"&&
      <div className='homeSidebar'>
      <div className='homeSidebarLeft'>
      <span className='sidebarTitle'>VIAU</span>
        <div>
        <div className='homeSidebarBtn'>
        <button onClick={()=>{setCurrentPage("adminOrders")}}>Užsakymai</button>
        </div>
        <div className='homeSidebarBtn'>
        <button onClick={()=>{setCurrentPage("adminFood")}}>Patiekalai</button>
        </div>
        <div className='homeSidebarBtn'>
        <button onClick={()=>{setCurrentPage("adminPlaces")}}>Įstaigos</button>
        </div>
        <div className='homeSidebarBtn'>
        <button onClick={()=>{props.logout()}}>Atsijungti</button>
        </div>
        </div>
      </div>
    </div>}
      {!isLoading && props.currentUser.type ==="user" ? 
      <div className='homeMain'>
        <div className={addingAnim ? "homeSidebarCartBtnBiggened" : "homeSidebarCartBtn"}>
            <button onClick={()=>{setCurrentPage("cart")}}><FontAwesomeIcon icon={!addingAnim ? faCartShopping : faCheck} /></button>
          </div>
        {currentPage==="main"&&
        <div>Main page</div>}
        {currentPage==="places"&&
        <Places singlePlace={singlePlace}/>}
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
        {currentPage==="singlePlace"&&
        <SinglePlace pickedPlace={singlePickedPlace} items={items} singularItem={singularItem} addToCart={addToCart}/>}
      </div>:
      <div className='homeMain'>
        {currentPage ==="adminOrders"&&
        <AdminOrders/>}
        {currentPage ==="adminFood"&&
        <AdminFood/>}
        {currentPage ==="adminPlaces"&&
        <AdminPlaces/>}
      </div>}
    </div>
  )
}

export default Home