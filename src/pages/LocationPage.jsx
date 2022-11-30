import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';


function LocationPage() {
  const [location, setLocation] = useState('');
  const { id } = useParams();


  const fetchLocationDetails = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}locations/${id}`);
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
      <h4>{location.barName}'s Upcoming Jam Sessions:</h4>
      {location && location.jamSessions.map((jamSess)=> {
        
            return(
              <div key={jamSess._id}>
                <img src={jamSess.image} />
                <h2> <Link to={`/events/${jamSess._id}`}>{jamSess.jamSessionName}</Link></h2>
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