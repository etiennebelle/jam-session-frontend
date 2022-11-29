import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';


function LocationPage() {
  const [location, setLocation] = useState('');
  const { id } = useParams();


  const fetchLocationDetails = async () => {
    try {
        const response = await fetch(`http://localhost:5005/locations/${id}`);
        const parsed = await response.json();
        setLocation(parsed);  
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    fetchLocationDetails();
  }, [])

  return (
    <div>
      <h3>{location.barName}</h3>
      <p>{location.address}</p>
      <p>{location.town}</p>
      <h4>{location.barName}'s Jam Sessions:</h4>
      {location && location.jamSessions.map((jamSess)=> {
        return(
          <div key={jamSess._id}>
            <img src={jamSess.image} />
            <h2>{jamSess.jamSessionName}</h2>
            <p>{jamSess.date}</p>
            <p>{jamSess.time}</p>
            <p>{jamSess.genre}</p>
          </div>
        )
      })}

    </div>
  )
}

export default LocationPage