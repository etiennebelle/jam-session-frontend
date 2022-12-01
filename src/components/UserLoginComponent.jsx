import { Button, TextInput, PasswordInput } from '@mantine/core';
import { Link } from 'react-router-dom';

function UserLoginComponent({handleSubmit, email, setEmail, password, setPassword, errorMessage}) {
  return (
    <div className='user-login-form'>
    <form className='crud-form' onSubmit={handleSubmit}>
        <label className='create-label'>
            <TextInput
                type='text'
                placeholder="Email"
                radius="xs"
                value={email}
                onChange={event => setEmail(event.target.value)}
                required
            />
        </label>
        <label className='create-label'>
            <PasswordInput
                type='password'
                radius="xs"
                description="Password must include at least one letter, number and special character"
                placeholder="Password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                required
            />
        </label>
        <div className='crud-btn'>
            <Button 
                type='submit'
                color="dark"
                radius="xl">
                Login
            </Button>
        </div>
        
    </form>
    { errorMessage && <p>{errorMessage}</p> }
    </div>
  )
}

export default UserLoginComponent