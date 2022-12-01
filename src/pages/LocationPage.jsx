import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns'


function LocationPage() {
  const [location, setLocation] = useState('');
  const { id } = useParams();
  const [checkboxCapacity, setCheckboxCapacity] = useState(true)
  const [jamsArr, setJamsArr] = useState([]);
  const [futureEvents, setFutureEvents] = useState(true)

  const fetchLocationDetails = async () => {
    try {
      if (futureEvents) {
        const response = await fetch(`${process.env.REACT_APP_API_URL}locations/${id}`);
        const parsed = await response.json();
        setLocation(parsed); 
        setJamsArr(parsed.jamSessions) 
      } else {
        const response = await fetch(`${process.env.REACT_APP_API_URL}locations/${id}/past-events`);
        const parsed = await response.json();
        setLocation(parsed); 
        setJamsArr(parsed.jamSessions) 
      }
       
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
  const formatDate = (oneDate) => {
    return format(new Date(oneDate), 'PPPP');
  }

  useEffect(() => {
    fetchLocationDetails();
  }, [])

  const handlePastClick = () => {
    setFutureEvents(!futureEvents)
    fetchLocationDetails()
  }

  return (
    <div>
      <h3>{location.barName}</h3>
      <p>{location.address}</p>
      <button type="button" onClick={handlePastClick}>{location.barName}'s Past Events</button>
      <h4>{location.barName}'s Upcoming Jam Sessions:</h4>
      <label><input type="checkbox" onClick={handleClick}></input>Only Show Sessions With Spots Left</label>
      {location && jamsArr.map((jamSess)=> {
        
            return(
              <div key={jamSess._id}>
                <img src={jamSess.image} />
                <h2> <Link to={`/events/${jamSess._id}`}>{jamSess.jamSessionName}</Link></h2>
                <p>{formatDate(jamSess.date)}</p>
                <p>{jamSess.time}</p>
                <p>{jamSess.genre}</p>
              </div>
            )
          
      
      })}

    </div>
  )
}

export default LocationPage