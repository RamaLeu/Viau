import React, {useState, useEffect} from 'react';
import './Places.css';

const Places = (props) => {
    let [places ,setPlaces] = useState([]);
    let [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('//localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/place')
        .then(response => response.json())
        .then(data => {
            setIsLoading(false);
            setPlaces(data.places);
        });
    }, []);
    
    function rating(count){
        let stars = [];
        for(let i = 0; i<count; i++){
            stars.push("S");
        }
        return stars;

    }
  return (
    <div className='placesPage'>
        {!isLoading&&
        places.map((place)=>(
            <div className='placesSinglePlace'>
                <div className='placesSingleImage'>
                    <img src={place.imgUrl}></img>
                </div>
                <div className='placesSingleName'>{place.name}</div>
                <div className='placesSingleAdress'>{place.adress}</div>
                <div className='placesSingleRating'>{rating(place.rating)}</div>
                <button className='placesSingleButton' onClick={()=>{props.singlePlace(place)}}>Peržiurėti meniu</button>
            </div>
        ))}
    </div>
  )
}

export default Places