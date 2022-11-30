import { useState, useContext } from "react";                      
import { Modal } from '@mantine/core';
import JamSessionForm from '../components/JamSessionForm';
import {HostAuthContext} from '../contexts/host-auth.context';
import { useNavigate } from "react-router-dom";

function JamSession({oneJamSess, deleteJamSess, hostid, formatDate, getHostData, jamSessions, setJamSessions}) {
    const [isEditing, setIsEditing] = useState(false)
    const [date, setDate] = useState(oneJamSess.date)
    const [time, setTime] = useState(oneJamSess.time)
    const [jamSessionName, setJamSessionName] = useState(oneJamSess.jamSessionName)
    const [capacity, setCapacity] = useState(oneJamSess.capacity)
    const [genre, setGenre] = useState(oneJamSess.genre)
    const [description, setDescription] = useState(oneJamSess.description)
    const [errorMessage, setErrorMessage] = useState(undefined);
    const { host, setHost, storedToken } = useContext(HostAuthContext);   
    const [successMessage, setSuccessMessage] = useState(undefined);

    
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        //get the image from file input, its files with an 's' and [0] for the first one because you possibly could add multiple.
        const image = event.target.imageUrl.files[0];
    
        //create a new form data to send and append all the key value pairs to it
        const formData = new FormData();
        formData.append("imageUrl", image);
        formData.append("jamSessionName", jamSessionName);
        formData.append("date", date);
        formData.append("time", time);
        formData.append("capacity", capacity);
        formData.append("genre", genre);
        formData.append("description", description);
        formData.append("host", hostid);

        // Send the formData with all the key: value pairs attached to it
        try {
            let response = await fetch(`${process.env.API_URL}host/jam-sessions/${oneJamSess._id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
                body: formData
            })
            const parsed = await response.json()
            if (response.status === 200) {
                setSuccessMessage("Event updated successfully")
                setJamSessions(parsed.jamSessions)

            } else {
                setErrorMessage(parsed.message)
            }
        } catch (error) {
            console.log(error)
        }
       
    }




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
            <form onSubmit={handleSubmit}  encType="multipart/form-data">
                <JamSessionForm 
                    jamSessionName={jamSessionName}
                    setJamSessionName={setJamSessionName}
                    date={formatDate(date)}
                    setDate={setDate}
                    time={time}
                    setTime={setTime}
                    capacity={capacity}
                    setCapacity={setCapacity}
                    genre={genre}
                    setGenre={setGenre}
                    description={description}
                    setDescription={setDescription}
                    hostid={hostid}
                />
                <button type="submit">Update Jam Session</button>
            </form>
            {successMessage && <p>{successMessage}</p>}
        </Modal>
    </div>
  )
}

export default JamSession