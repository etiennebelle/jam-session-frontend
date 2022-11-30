import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';


function LocationPage() {
  const [location, setLocation] = useState('');
  const { id } = useParams();
  const [checkboxCapacity, setCheckboxCapacity] = useState(true)
  const [jamsArr, setJamsArr] = useState([]);

  const fetchLocationDetails = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}locations/${id}`);
        const parsed = await response.json();
        setLocation(parsed); 
        setJamsArr(parsed.jamSessions) 
    } catch (error) {
        console.log(error);
    }
  }

  const handleClick = () => {
    setCheckboxCapacity(!checkboxCapacity)
    if (checkboxCapacity) {
        const sessFilterByCapacity = location.jamSessions.filter((oneJam) => {
            return (oneJam.capacity > oneJam.players.length)
        })
        setJamsArr(sessFilterByCapacity)
    } else {
      fetchLocationDetails()
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
      <label><input type="checkbox" onClick={handleClick}></input>Only Show Sessions With Spots Left</label>
      {location && jamsArr.map((jamSess)=> {
        
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