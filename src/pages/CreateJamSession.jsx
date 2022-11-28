import { useState, useContext} from 'react'
import { Link, useNavigate } from "react-router-dom";
import JamSessionForm from '../components/JamSessionForm';
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

    const navigate = useNavigate();

    const hostid = host.data._id
    if (!hostid){
        return <p>Loading...</p>
    }  

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
        let response = await fetch("http://localhost:5005/host/create-jam-session", {
            method: 'POST',
            body: formData
        })
        const parsed = await response.json()
        if (response.status === 201) {
            navigate('/host/profile')
        } else {
            setErrorMessage(parsed.message)
        }
    }

  return (
  
    <>
    <form onSubmit={handleSubmit} encType="multipart/form-data">
        <JamSessionForm 
                jamSessionName={jamSessionName}
                setJamSessionName={setJamSessionName}
                date={date}
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
       <button type="submit">Create Jam Session</button>
    </form>
    

    </>
  )
}


export default CreateJamSession