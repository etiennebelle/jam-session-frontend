import { useState, useEffect } from 'react';

function JamSessions({ events }) {

    const [jamsArr, setJamsArr] = useState([]);
    const [filteredJams, setFilteredJams] = useState('');

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
        sortEventsByDate();
    }, [events])

    return (
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
                <div key={jam._id}>
                    <h3>{jam.jamSessionName}</h3>
                    <p>Created by: {jam.host.barName}</p>
                    <p>Location: {jam.host.town}</p>
                    <span>{jam.date}</span>
                    <span>{jam.time}</span>
                </div>
            ))}
            
        </div>
    )
}

export default JamSessions