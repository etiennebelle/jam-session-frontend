import { useState } from 'react';
import { TextInput, Textarea, Select, FileInput, NumberInput } from '@mantine/core';
import { DatePicker, } from '@mantine/dates';
import { TimeInput, TimeRangeInput } from '@mantine/dates';

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
        <div>
            <label>
                <TextInput
                    type="string" 
                    value={jamSessionName}
                    name='jamSessionName'
                    onChange={(event) => setJamSessionName(event.currentTarget.value)} 
                    placeholder="Event Name"
                    radius="xs"
                    required
                />
            </label>
            <label>
                <DatePicker
                    type="date" 
                    name='date'
                    value={date} 
                    onChange={setDate} 
                    dropdownType="modal"
                    placeholder="Pick a date"
                    radius="xs"
                    required
                /> 
            </label>
            <label>
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
            <label>
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
            <label>
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
            <label>
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