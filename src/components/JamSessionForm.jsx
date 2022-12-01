import { TextInput, Textarea, Select, FileInput, NumberInput } from '@mantine/core';
import { DatePicker, } from '@mantine/dates';
import { TimeInput } from '@mantine/dates';
import dayjs from 'dayjs';

function JamSessionForm({ jamSessionName, setJamSessionName, date, setDate, time, setTime, capacity, setCapacity, genre, setGenre, description, setDescription, hostid }) {
  
    const data = [
        {value: 'Rock', label: 'Rock'},
        {value: 'Jazz', label: 'Jazz'},
        {value: 'Funk', label: 'Funk'},
        {value: 'Pop', label: 'Pop'},
        {value: 'Balkan', label: 'Balkan'},
        {value: 'Hip-Hop', label: 'Hip-Hop'},
        {value: 'Classical', label: 'Classical'},
        {value: 'Electronic', label: 'Electronic'}
    ]

    return (
        <div className='labels-ctn'>
            <label className='create-label'>
                <TextInput
                    type="text" 
                    value={jamSessionName}
                    name='jamSessionName'
                    onChange={(event) => setJamSessionName(event.currentTarget.value)} 
                    placeholder="Event Name"
                    radius="xs"
                    required
                />
            </label>
            <label className='create-label'>
                <DatePicker
                    type="date" 
                    name='date'
                    value={date} 
                    onChange={setDate} 
                    dropdownType="modal"
                    placeholder="Pick a date"
                    radius="xs"
                    required
                    minDate={dayjs(new Date()).toDate()}
                /> 
            </label>
            <label className='create-label'>
                <TimeInput
                    type="time" 
                    name='time'
                    value={time} 
                    onChange={setTime} 
                    radius="xs"
                    amLabel="am"
                    pmLabel="pm"
                    withAsterisk
                    clearable
                    required
                /> 
            </label>
            <label className='create-label'>
                <NumberInput
                    type="number" 
                    name='capacity'
                    value={capacity} 
                    onChange={event => setCapacity(event)} 
                    placeholder="Number of players"
                    radius="xs"
                    hideControls
                    required
                />
            </label>
            <label className='create-label'>
                <Select
                    value={genre}
                    onChange={setGenre}
                    name='genre'
                    data={data}
                    placeholder="Genre"
                    radius="xs"
                    required
                />
            </label>
            <label className='create-label'>
                <Textarea
                    type="text" 
                    name='description'
                    value={description} 
                    onChange={event => setDescription(event.currentTarget.value)} 
                    placeholder="Description"
                    radius="xs"
                    required
                />
            </label>
            <FileInput
                className='create-label'
                type="file"
                name="imageUrl"
                accept="image/png, image/jpg"
                placeholder="Your image"
                radius="xs"
            />
            <input 
                name='host'
                defaultValue={hostid}
                hidden
            />
        </div>
    )
}

export default JamSessionForm