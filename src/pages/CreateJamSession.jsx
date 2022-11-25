import { useState, useContext} from 'react'
import { useNavigate } from "react-router-dom";
import {HostAuthContext} from '../contexts/host-auth.context';



function CreateJamSession() {
    const [date, setDate] = useState('')
    const [jamSessionName, setJamSessionName] = useState('')
    const [capacity, setCapacity] = useState('')
    const [genre, setGenre] = useState('')
    const [description, setDescription] = useState('')
    const [errorMessage, setErrorMessage] = useState(undefined);
    const { host } = useContext(HostAuthContext);  


    const navigate = useNavigate();
    
    const handleSubmit = async event => {
        try {
            event.preventDefault()
            const response = await fetch('http://localhost:5005/host/create-jam-session', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json', 
                },
                body: JSON.stringify({date, jamSessionName, capacity, genre, description, host: host.data})
            })
            const parsed = await response.json()
            if (response.status === 201) {
                navigate('/host/profile')
              } else {
                setErrorMessage(parsed.message)
            }
        } catch (error) {
            const errorDescription = error.message;
            setErrorMessage(errorDescription);
        }
    }


  return (
    <>
    <form onSubmit={handleSubmit}>
        <label>Event Name: 
            <input 
            type="string" 
            value={jamSessionName} 
            onChange={event => setJamSessionName(event.target.value)} 
            required/>
        </label>
        <label>Date: 
            <input 
            type="date" 
            value={date} 
            onChange={event => setDate(event.target.value)} 
            required/>
        </label>
        <label>Max number of artists: 
            <input 
            type="number" 
            value={capacity} 
            onChange={event => setCapacity(event.target.value)} 
            required/>
        </label>
        <label>Genre: 
            <select onChange={event => setGenre(event.target.value)} required >
                <option value="Rock">Rock</option>
                <option value="Funk">Funk</option>
                <option value="Jazz">Jazz</option>
                <option value="Pop">Pop</option>
                <option value="Balcan">Balcan</option>
                <option value="Hip Hop">Hip Hop</option>
                <option value="Classical">Classical</option>
                <option value="Electronic">Electronic</option>
            </select>
        </label>
        <label>Description: 
            <input 
            type="text" 
            value={description} 
            onChange={event => setDescription(event.target.value)} 
            required/>
        </label>
        <button type="submit">Create Jam Session</button>
    </form>

    </>
  )
}

export default CreateJamSession