import { useState, useContext } from "react";                      
import { Modal, Button, Group } from '@mantine/core';
import JamSessionForm from '../components/JamSessionForm';
import {HostAuthContext} from '../contexts/host-auth.context';

function JamSession({oneJamSess, deleteJamSess, formatDate, hostid}) {
    const [isEditing, setIsEditing] = useState(false)
    const [opened, setOpened] = useState(false);
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [jamSessionName, setJamSessionName] = useState('')
    const [capacity, setCapacity] = useState('')
    const [genre, setGenre] = useState('')
    const [description, setDescription] = useState('')
    const [errorMessage, setErrorMessage] = useState(undefined);
    const { host, setHost } = useContext(HostAuthContext);   

  return (
    <div>
        <img src={oneJamSess.image} />
        <h4>{oneJamSess.jamSessionName}</h4> 
        <p>Date: {formatDate(oneJamSess.date)}</p> 
        <p>Time: {oneJamSess.time}</p> 
        <p>Capacity: {oneJamSess.capacity}</p> 
        <p>Genre: {oneJamSess.genre}</p> 
        <p>Event Description: {oneJamSess.description}</p>
        <button onClick={()=>setIsEditing(true)}>Edit Jam Session</button>          
        <button onClick={()=>deleteJamSess(oneJamSess._id)}>Delete Jam Session</button>          
        <Modal
            opened={isEditing}
            onClose={() => setIsEditing(false)}
            title="Edit Jam Session"
        >
            <form method="POST" action={`http://localhost:5005/host/jam-sessions/${oneJamSess._id}`} encType="multipart/form-data">
            <label>Event Name: 
                <input 
                type="string" 
                defaultValue={oneJamSess.jamSessionName}
                name='jamSessionName'
                onChange={event => setJamSessionName(event.target.value)} 
                required/>
            </label>
        <label>Date: 
            <input 
            type="date" 
            name='date'
            value={date} 
            onChange={event => setDate(event.target.value)} 
            required/>
        </label>
        <label>Time: 
            <input 
            type="time" 
            name='time'
            value={time} 
            onChange={event => setTime(event.target.value)} 
            required/>
        </label>
        <label>Max number of artists: 
            <input 
            type="number" 
            name='capacity'
            value={capacity} 
            onChange={event => setCapacity(event.target.value)} 
            required/>
        </label>
        <label>Genre: 
            <select onChange={event => setGenre(event.target.value)} name='genre' required >
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
            name='description'
            value={description} 
            onChange={event => setDescription(event.target.value)} 
            required/>
        </label>
        <input type="file" name="imageUrl" accept="image/png, image/jpg"/>
        <input 
            name='host'
            defaultValue={hostid}
            hidden
        />
            </form>
             <button type="submit">Update Jam Session</button>
        </Modal>
    </div>
  )
}

export default JamSession