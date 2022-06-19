import React, {useState, useEffect} from 'react';
import './CSS/AdminFood.css';

const AdminFood = (props) => {

  let [isLoading, setIsLoading] = useState(true);
  let [items, setItems] = useState([]);
  let [places, setPlaces] = useState([]);
  let [tempItems, setTempItems] = useState([]);
  let [imgUrl, setImgUrl] = useState("");
  let [name, setName] = useState("");
  let [price, setPrice] = useState(0);
  let [menuType, setMenuType] = useState("");
  let [placeId, setPlaceId] = useState("");
  let [placeName, setPlaceName] = useState("");

  function fetchItems(){
    fetch('//localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/menu')
        .then(response => response.json())
        .then(data => {
            setItems(data.places);
            setTempItems(data.places);
        });
  }

  function fetchPlaces(){
    fetch('//localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/place')
    .then(response => response.json())
    .then(data => {
        setIsLoading(false);
        setPlaces(data.places);
    });
  }
  useEffect(() => {
    fetchItems();
    fetchPlaces();
  }, []);


  function addNewFoodItem(e){
    e.preventDefault();
    let data = {
      name: name,
      price: price, 
      rating: 0,
      menu: menuType,
      place: placeName,
      placeId: placeId,
      img_url: imgUrl
    };
    const postURL = 'http://localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/menu';
        fetch(postURL, {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            data
          ),
      }).then(()=>{
        fetchItems();
        fetchPlaces();
      });
  }


  function setPlace(value){
    value = value.split(',');
    setPlaceId(value[0]);
    setPlaceName(value[1]);
  }
  
  return (
    <div className='adminFoodPage'>
      <div className='adminFoodList'>
      {!isLoading && 
      items.map((item)=>(
        <div className='adminFoodSingleItem'>
          <div className='adminFoodSingleText'>Pavadinimas: {item.name}</div>
          <div className='adminFoodSingleText'>Kaina: {item.price}</div>
          <div className='adminFoodSingleText'>Reitingas: {item.rating}</div>
          <div className='adminFoodSingleText'>Meniu tipas: {item.menu}</div>
          <div className='adminFoodSingleText'>Įstaiga:{item.place}</div>
        </div>
      ))}
      </div>
      <div className='adminFoodAdd'>
        <span>Pridėti naują</span>
        <form onSubmit={(e)=>{addNewFoodItem(e)}}>
          <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Pavadinimas' required></input>
          <input type="number" value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder="kaina" required></input>
          <select value={menuType} onChange={(e)=>{setMenuType(e.target.value)}} required>
            <option value="" disabled>Meniu tipas</option>
            <option value="breakfast">Pusryčių</option>
            <option value="lunch">Pietų</option>
            <option value="dinner">Vakarienės</option>
          </select>
          <select value={[placeId, placeName]} onChange={(e)=>{setPlace(e.target.value)}} required>
              <option value={["",""]} disabled>Įstaiga</option>
              {!isLoading && 
              places.map((place)=>(
                <option value={[[place._id, place.name]]}>{place.name}</option>
              ))}
          </select>
          <input type="text" value={imgUrl} onChange={(e)=>{setImgUrl(e.target.value)}} required placeholder='Nuotraukos URL'></input>
          <input type="submit" value="Pridėti"></input>
        </form>
      </div>
    </div>
  )
}

export default AdminFood