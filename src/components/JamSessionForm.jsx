function JamSessionForm({jamSessionName, setJamSessionName, date, setDate, time, setTime, capacity, setCapacity, genre, setGenre, description, setDescription, hostid}) {
  return (
    <div>
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
    </div>
  )
}

export default JamSessionForm