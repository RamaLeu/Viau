import React, {useEffect, useState} from 'react';
import './CSS/AdminPlaces.css';

const AdminPlaces = () => {
  let [isLoading, setIsLoading] = useState(true);
  let [places, setPlaces] = useState([]);
  let [name, setName] = useState("");
  let [adress, setAdress] = useState("");
  let [imgUrl, setImgUrl] = useState("");


  function fetchPlaces(){
    fetch('//localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/place')
    .then(response => response.json())
    .then(data => {
        setIsLoading(false);
        setPlaces(data.places);
    });
  }


  useEffect(() => {
    fetchPlaces();
  }, []);


  function addANewPlace(e){
    e.preventDefault();
    let data = {
      name: name,
      adress: adress,
      rating: 0,
      imgUrl: imgUrl
    };
    const postURL = 'http://localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/place';
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
        fetchPlaces();
      });
  }
  
  return (
    <div className='adminPlacesPage'>
      <div className='adminPlacesList'>
      {places.map((place)=>(
        <div className='adminPlacesSinglePlace'>
          <div className='adminPlacesSingleText'>Pavadinimas: {place.name}</div>
          <div className='adminPlacesSingleText'>Adresas: {place.adress}</div>
          <div className='adminPlacesSingleText'>Reitingas: {place.rating}</div>
        </div>
      ))}
      </div>
      <div className='adminPlacesAdd'>
        <form onSubmit={(e)=>{addANewPlace(e)}}>
          <input type="text" onChange={(e)=>{setName(e.target.value)}} placeholder="Pavadinimas"></input>
          <input type="text" onChange={(e)=>{setAdress(e.target.value)}} placeholder="Adresas"></input>
          <input type="text" onChange={(e)=>{setImgUrl(e.target.value)}} placeholder="Nuotraukos URL"></input>       
          <input type="submit" value="Pridėti"></input></form>
      </div>
    </div>
  )
}

export default AdminPlaces