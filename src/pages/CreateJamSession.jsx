import { useState } from 'react'

function CreateJamSession() {
    const [date, setDate] = useState('')
    const [jamSessionName, setJamSessionName] = useState('')
    const [capacity, setCapacity] = useState('')
    const [genre, setGenre] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = event => {
        event.preventDefault()
        console.log('submit')
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