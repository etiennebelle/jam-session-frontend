import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns'
import { Button } from '@mantine/core';


function LocationPage() {
  const [location, setLocation] = useState('');
  const { id } = useParams();
  const [checkboxCapacity, setCheckboxCapacity] = useState(true)
  const [jamsArr, setJamsArr] = useState([]);
  const [futureEvents, setFutureEvents] = useState(true)
  const [pastOrFutureText, setPastOrFutureText] = useState('Past Jams')
  const [pastOrFutureTitle, setPastOrFutureTitle] = useState('Upcoming Jam')

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
    if (futureEvents) {
      setPastOrFutureText("Past Jams")
      setPastOrFutureTitle('Upcoming Jam')
    } else {
      setPastOrFutureText("Upcoming Jams")
      setPastOrFutureTitle('Past Jam')
    }
  }

  return (
    <div className='main'>
      <div className="greeting-host greeting">
          <h3>{location.barName}</h3>
      </div>
      <div className='location-address'>
        <p>{location.address}</p>
      </div>
      <div className='host-btns'>
        <Button variant="outline" color="dark" radius="xl" onClick={handlePastClick}>
            {location.barName}'s {pastOrFutureText}
        </Button>
      </div>
      <div className='section-title'>
        <h4>{`${location.barName}'s ${pastOrFutureTitle} Sessions:`}</h4>
      </div>
      <div className='sessions-checkbox'>
        <label><input type="checkbox" onClick={handleClick}></input>Only Show Sessions With Spots Left</label>
      </div>

      {location && jamsArr.map((jamSess)=> {
        return (
              
          <div className={`jam-session-card ${jamSess.genre.toLowerCase()}`} key={jamSess._id}>
                            
              <div className='jam-top'>
                  <p className='jam-date'>{jamSess.date}</p>
                  <p className='jam-time'>{jamSess.time.slice(16,21)}</p>
              </div>

              <Link to={`/events/${jamSess._id}`} >

                  <div className='jam-main' style={{ backgroundImage: `url(${jamSess.image})` }}>
                      <div className='jam-name'><p><span className={`${jamSess.genre.toLowerCase()}`}></span>{jamSess.jamSessionName}</p></div>
                  </div>

              </Link>

              <div className='jam-bottom'>
                <p>{jamSess.genre}</p> 
                <p>Capacity: {jamSess.capacity}</p> 
              </div> 
              <div className="jam-description">
                  <p>{jamSess.description}</p>
              </div>
          </div>

            // <div key={jamSess._id}>
            //   <img src={jamSess.image} />
            //   <h2> <Link to={`/events/${jamSess._id}`}>{jamSess.jamSessionName}</Link></h2>
            //   <p>{formatDate(jamSess.date)}</p>
            //   <p>{jamSess.time}</p>
            //   <p>{jamSess.genre}</p>
            // </div>
            )
      })}

    </div>
  )
}

export default LocationPage