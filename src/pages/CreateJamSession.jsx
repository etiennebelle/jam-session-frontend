import { useState, useContext} from 'react'
import { Link, useNavigate } from "react-router-dom";
import {HostAuthContext} from '../contexts/host-auth.context';



function CreateJamSession() {
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [jamSessionName, setJamSessionName] = useState('')
    const [capacity, setCapacity] = useState('')
    const [genre, setGenre] = useState('')
    const [description, setDescription] = useState('')
    const [errorMessage, setErrorMessage] = useState(undefined);
    const { host, setHost } = useContext(HostAuthContext);  

    const hostid = host.data._id
    if (!hostid){
        return <p>Loading...</p>
    }  

  return (
  
    <>
    <form method="POST" action="http://localhost:5005/host/create-jam-session" encType="multipart/form-data">
        <label>Event Name: 
            <input 
            type="string" 
            value={jamSessionName}
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
            <select onChange={event => setGenre(event.target.value)} name='genre'
required >
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
        <button type="submit">Create Jam Session</button>
    </form>
    </>
  )
}

export default CreateJamSession