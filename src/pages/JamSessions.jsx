import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function JamSessions({ events }) {

    return (
        <div>
            <h2>Upcoming Jam Sessions:</h2>

            {events.map((event) => (
                <div key={event._id}>
                    <h3>{event.jamSessionName}</h3>
                    <p>Created by: {event.host}</p>
                    <span>{event.date}</span>
                    <span>{event.time}</span>
                    <img src={event.image} />
                </div>
            ))}
            
        </div>
    )
}

export default JamSessions