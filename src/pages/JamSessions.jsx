import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { format } from 'date-fns'
import dayjs from 'dayjs';
import Footer from '../components/Footer';


function JamSessions() {
    const [jamsArr, setJamsArr] = useState([]);
    const [filteredJams, setFilteredJams] = useState('');
    const [value, setValue] = useState(null);
    const [searchDate, setSearchDate] = useState('');
    const [events, setEvents] = useState([]);
    const [checkboxCapacity, setCheckboxCapacity] = useState(true)

    const fetchEvents = async() => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}events`);
            const events = await response.json();
            setEvents(events);
        } catch (error) {
            console.log(error);
        }
    };
  
    useEffect(() => {
        fetchEvents();
    }, [])
    
    // Sort events by date
    const sortEventsByDate = () => {
        const jamsArr = structuredClone(events);
        jamsArr.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
        }).map(jam => {
            jam.date = format(new Date(jam.date), 'PPPP');
            return jam
        })
        setJamsArr(jamsArr);
    }

     // Set search input value
    const handleSearchInput = (event) => {
        setFilteredJams(event.target.value)
    }

    const handleClick = () => {
        setCheckboxCapacity(!checkboxCapacity)

        if (checkboxCapacity) {
            const sessFilterByCapacity = jamsArr.filter((oneJam) => {
                return (oneJam.capacity > oneJam.players.length)
            })
            setJamsArr(sessFilterByCapacity)
        } else {
            sortEventsByDate()
        }
    }

    useEffect(() => {
        if (!value) {
            setSearchDate('');
        } else {
          
        const searchDate = format(new Date(value), 'PPPP');
        setSearchDate(searchDate);  
        }
    }, [value])

    useEffect(() => {
        sortEventsByDate();
    }, [events])
    

    return jamsArr.length > 0 ? (
        <>
        <div className='main'>
            <div className='searchbar-ctn jams-left'>
                <div className='searchbar'>

                    <Input
                        className='search txt-input'
                        placeholder="Search for cities, bars, event names...Everything you want!"
                        type='text'
                        value={filteredJams}
                        onChange={handleSearchInput}
                    />
                    
                    <DatePicker
                        className='search cal-input'
                        placeholder="Event date"
                        value={value}
                        onChange={setValue}
                        minDate={dayjs(new Date()).toDate()}
                    />

                </div>
                <label className='checkbox' ><input type="checkbox" onClick={handleClick}></input> Only Show Sessions With Spots Left</label>
            </div>

            <section className='events upcoming-events jams-right'>
                <div className='section-title'>
                    <h2>Upcoming Jam Sessions</h2>
                </div>

                {jamsArr
                    .filter(jam => {
                        if (!searchDate) {
                            return true;
                        }
                        return jam.date === searchDate;
                    })
                    .filter(jam => {
                        const filter = filteredJams.toLowerCase();
                        return jam.host.barName.toLowerCase().includes(filter)
                            || jam.jamSessionName.toLowerCase().includes(filter)
                    }) 
                    .map((jam) => (
                        <div className={`jam-session-card ${jam.genre.toLowerCase()}`} key={jam._id}>
                            
                            <div className='jam-top'>
                                <p className='jam-date'>{jam.date}</p>
                                <p className='jam-time'>{jam.time.slice(16,21)}</p>
                            </div>

                            <Link to={`/events/${jam._id}`} >

                                <div className='jam-main' style={{ backgroundImage: `url(${jam.image})` }}>
                                    <div className='jam-name'><p><span className={`${jam.genre.toLowerCase()}`}></span>{jam.jamSessionName}</p><span className={''}></span></div>
                                </div>

                            </Link>

                            <div className='jam-bottom'>
                                <div className='jam-host'>
                                    <p>By <Link to={`/locations/${jam.host._id}`}>{jam.host.barName}</Link></p>
                                </div>
                            </div>
                        </div>
                    ))}
            </section>
            
            </div>
            <Footer />
        </>
    ) : (<></>)
}

export default JamSessions