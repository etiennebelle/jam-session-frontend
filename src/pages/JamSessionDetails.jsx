import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

function JamSessionDetails() {

    const API_URL = "http://localhost:5005";
    const { id } = useParams();
    const [jamSession, setJamSession] = useState();

    const fetchJamId = async () => {
        try {
            const response = await fetch(`${API_URL}/events/${id}`);
            const parsed = await response.json();
            setJamSession(parsed);
            console.log(parsed);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchJamId(setJamSession);
    }, [])

    return (
        <div>
            <div className=''>
                <h2>{jamSession.jamSessionName}</h2>
           </div>
        </div>
    )
}

export default JamSessionDetails