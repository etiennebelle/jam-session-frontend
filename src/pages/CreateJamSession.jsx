import { useState, useContext} from 'react'
import { useNavigate } from "react-router-dom";
import JamSessionForm from '../components/JamSessionForm';
import { HostAuthContext } from '../contexts/host-auth.context';
import { Button } from '@mantine/core';



function CreateJamSession() {
    const [date, setDate] = useState(''); //useState(new Date()) to get current date by default
    const [time, setTime] = useState(''); //useState(new Date()) to get current time by default
    const [jamSessionName, setJamSessionName] = useState('')
    const [capacity, setCapacity] = useState()
    const [genre, setGenre] = useState('')
    const [description, setDescription] = useState('')
    const [errorMessage, setErrorMessage] = useState(undefined);
    const { host, setHost, storedToken } = useContext(HostAuthContext);  

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
        let response = await fetch(`${process.env.REACT_APP_API_URL}host/jam-sessions`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
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
            <Button
                type='submit'
                color="red"
                radius="xs"
            >
            Create Jam Session
        </Button>
    </form>
    

    </>
  )
}


export default CreateJamSession