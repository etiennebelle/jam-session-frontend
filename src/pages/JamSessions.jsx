import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';

function JamSessions({ events }) {

    const [jamsArr, setJamsArr] = useState([]);
    const [filteredJams, setFilteredJams] = useState('');

    const sortEventsByDate = () => {
        const jamsArr = [...events];
        jamsArr.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
        })
        
         jamsArr.forEach(jam => {
             const formatDate = Date.parse(jam.date);
             console.log('events date:', formatDate);
             console.log('current date:', Date.now());
        //     if (formatDate < Date.now()) {
        //         jamsArr.shift(jam);
        //     }
         })

        setJamsArr(jamsArr);
    }

    const handleSearchInput = (event) => {
        setFilteredJams(event.target.value)
    }

    useEffect(() => {
        sortEventsByDate();
    }, [events])

    return jamsArr.length > 0 ? (
        <div>

            <div className='searchbar'>

                <p>Search</p>
                <input
                    value={filteredJams}
                    placeholder='Search'
                    type='text'
                    onChange={handleSearchInput}
                />

            </div>

            <h2>Upcoming Jam Sessions:</h2>

            {jamsArr
                .filter(jam => {
                    const filter = filteredJams.toLowerCase();
                    return jam.host.town.toLowerCase().includes(filter)
                })
                .map((jam) => (
                <Link to={`/events/${jam._id}`} key={jam._id}>
                <div className='jam-item-ctn'>
                    <h3>{jam.jamSessionName}</h3>
                    <p>Created by: {jam.host.barName}</p>
                    <p>Location: {jam.host.town}</p>
                    <span>{jam.date}</span>
                    <span>{jam.time}</span>
                </div>
                </Link>
            ))}
            
        </div>
    ) : (<></>)
}

export default JamSessions