import React from 'react';
import { useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput, PasswordInput, Textarea, Select, FileInput, NumberInput, Button } from '@mantine/core';
import { UserAuthContext } from '../contexts/user-auth.context';

function UserSignupForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [instrument, setInstrument] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState(undefined);
    const { storeToken, setIsLoggedIn, authenticateUser } = useContext(UserAuthContext);

    const popularInstruments = [
        {value: 'Vocals', label: 'Vocals'},
        {value: 'Piano', label: 'Piano'},
        {value: 'Guitar', label: 'Guitar'},
        {value: 'Bass', label: 'Bass'},
        {value: 'Double Bass', label: 'Double Bass'},
        {value: 'Drums', label: 'Drums'},
        {value: 'Violin', label: 'Violin'},
        {value: 'Saxophone', label: 'Saxophone'},
        {value: 'Trumpet', label: 'Trumpet'},
        {value: 'Clarinet', label: 'Clarinet'},
    ]

    const handleSubmit = async event => {

        try {
           event.preventDefault();

            const res = await fetch(`${process.env.REACT_APP_API_URL}user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, email, password, instrument}),
            })

            const parsed = await res.json();
            const loginResponse = await fetch(`${process.env.REACT_APP_API_URL}user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
            })
            const parsedLoginRes = await loginResponse.json();
            storeToken(parsedLoginRes.authToken);


            if (res.status === 201) {
                setIsLoggedIn(true);
                authenticateUser();
                navigate('/user/profile')
                } else {
                setErrorMessage(parsed.message)
            }
 
        } catch (error) {
            const errorDescription = error.message;
            setErrorMessage(errorDescription);
        }
     };

    return (
        <div className='labels-ctn'>
            <form onSubmit={handleSubmit} className='crud-form'>
                <label className='create-label'>
                    <TextInput
                        type="text"
                        value={username}
                        placeholder="Username"
                        radius="xs"
                        onChange={event => setUsername(event.target.value)}
                    />
                </label>
                <label className='create-label'>
                    <TextInput
                        type="text"
                        value={email}
                        placeholder="Email"
                        radius="xs"
                        onChange={event => setEmail(event.target.value)}
                    />
                </label>
                <label className='create-label'>
                    <Select
                        value={instrument}
                        name="selectInstrument"
                        placeholder="Choose your instrument:"
                        data={popularInstruments}
                        onChange={setInstrument}
                        radius="xs"
                    />
                </label>
                <label className='create-label'>
                    <PasswordInput
                        placeholder="Password"
                        value={password}
                        type="password"
                        onChange={event => setPassword(event.target.value)}
                        description="Password must include at least one letter, number and special character"
                        withAsterisk
                        radius="xs"
                    />
                </label>
                <div className='crud-btn'>
                    <Button 
                        radius="xl"
                        color="dark"
                        type='submit'>
                        Sign up
                    </Button>
                </div>
            </form>
            { errorMessage && <p>{errorMessage}</p> }
        </div>
    )
}

export default UserSignupForm