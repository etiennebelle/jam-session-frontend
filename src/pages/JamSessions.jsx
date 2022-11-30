import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@mantine/core';
// import { DatePicker } from '@mantine/dates';
import { format } from 'date-fns'

function JamSessions({ events }) {
    const [jamsArr, setJamsArr] = useState([]);
    const [filteredJams, setFilteredJams] = useState('');
    const [value, setValue] = useState(null);
    const [searchDate, setSearchDate] = useState('');
    
    const sortEventsByDate = () => {
        const jamsArr = [...events];
        jamsArr.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
        })
        setJamsArr(jamsArr);
    }
    
    const handleSearchInput = (event) => {
        setFilteredJams(event.target.value)
    }
    
    useEffect(() => {
        const searchDate = format(new Date(value), 'PPPP');
        setSearchDate(searchDate);
    }, [value])

    useEffect(() => {
        sortEventsByDate();
        jamsArr.map(e => {
            e.date = format(new Date(e.date), 'PPPP');
            return e
        })
    }, [events])

    return jamsArr.length > 0 ? (
        <div>
            <div className='searchbar-ctn'>
                <div className='searchbar'>

                    <p>Search</p>
                    <Input
                        placeholder="What are you looking for?"
                        type='text'
                        value={filteredJams}
                        onChange={handleSearchInput}
                    />
                    
                    {/* <DatePicker
                        placeholder="Event date"
                        label="Pick date"
                        value={value}
                        onChange={setValue}
                    /> */}

                </div>
            </div>
            
            <section className='upcoming-events'>
                <div className='section-title'>
                    <h2>Upcoming Jam Sessions</h2>
                </div>

                {jamsArr
                    // .filter(jam => {
                    //     if (!searchDate) {
                    //         return true;
                    //     }
                    //     return jam.date === searchDate;
                    // })
                    .filter(jam => {
                        const filter = filteredJams.toLowerCase();
                        return jam.host.town.toLowerCase().includes(filter)
                            || jam.host.barName.toLowerCase().includes(filter)
                            || jam.jamSessionName.toLowerCase().includes(filter)
                    }) 
                    .map((jam) => (
                        <div className={`jam-session-card ${jam.genre.toLowerCase()}`} key={jam._id}>
                            <Link to={`/events/${jam._id}`} >
                                <div className='jam-img-ctn' >
                                    <img src={jam.image} className="jam-img" alt='jam-session-image' />
                                </div>
                            </Link>
                            <div className='jam-infos-ctn'>
                                <div className='jam-name-ctn'>
                                    <h3 className='jam-name'>{jam.jamSessionName}</h3>
                                </div>
                                <div className='jam-date-ctn'>
                                    <p>{jam.date}</p>
                                    <p>{jam.time.slice(16,21)}</p>
                                </div>
                                <div className='jam-host-ctn'>
                                    <p>Created by: <Link to={`/locations/${jam.host._id}`}>{jam.host.barName}</Link></p>
                                    <p>Location: {jam.host.town}</p>
                                </div>
                            </div>
                        </div>
                    ))}
            </section>
            
        </div>
    ) : (<></>)
}

export default JamSessions