import { useState, useContext } from "react";                      
import { Modal, Button } from '@mantine/core';
import JamSessionForm from '../components/JamSessionForm';
import {HostAuthContext} from '../contexts/host-auth.context';
import { useNavigate, Link } from "react-router-dom";
import { format } from 'date-fns'

function JamSession({oneJamSess, deleteJamSess, hostid, getHostData, jamSessions, setJamSessions}) {
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
            let response = await fetch(`${process.env.REACT_APP_API_URL}host/jam-sessions/${oneJamSess._id}`, {
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

    const formatDate = (oneDate) => {
        return format(new Date(oneDate), 'PPPP');
      }

  return (

      <div className="jam-session-card">
          
            <div className='jam-top'>
                <p className='jam-date'>{formatDate(oneJamSess.date)}</p>
                <p className='jam-time'>{oneJamSess.time.slice(16,21)}</p>
            </div>
            
            <Link to={`/events/${oneJamSess._id}`} >

                <div className='jam-main' style={{ backgroundImage: `url(${oneJamSess.image})` }}>
                    <div className='jam-name'><p><span className={`${oneJamSess.genre.toLowerCase()}`}></span>{oneJamSess.jamSessionName}</p></div>
                </div>

            </Link>
            
            <div className='jam-bottom'>
                <p>{oneJamSess.genre}</p> 
                <p>Capacity: {oneJamSess.capacity}</p> 
            </div> 
            <div className="jam-description">
                <p>{oneJamSess.description}</p>
            </div>
            <div className="jam-controllers">
                <Button
                  color="dark"
                  radius="xl"
                  onClick={() => setIsEditing(true)}>
                    Update Jam
                </Button>
                <Button
                  color="dark"
                  radius="xl"
                  onClick={() => deleteJamSess(oneJamSess._id)}>
                    Delete Jam
                </Button>
            </div>
        
        <Modal
            opened={isEditing}
            onClose={() => setIsEditing(false)}
            title="Edit Jam Session"
        >
            <form className='crud-form' onSubmit={handleSubmit}  encType="multipart/form-data">
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
                <div className='crud-btn'>
                    <Button
                        type='submit'
                        color="dark"
                        radius="xl">
                        Edit Jam
                    </Button>
                </div>
              </form>
              
              {successMessage && <p>{successMessage}</p>}
              
        </Modal>
    </div>
  )
}

export default JamSession