import { Link } from 'react-router-dom';

function UserLoginComponent({handleSubmit, email, setEmail, password, setPassword, errorMessage}) {
  return (
    <div className='user-login-form'>
    <form onSubmit={handleSubmit}>
        <label>Email:
            <input
                type='text'
                value={email}
                onChange={event => setEmail(event.target.value)}
            />
        </label>
        <label>Password:
            <input
                type='password'
                value={password}
                onChange={event => setPassword(event.target.value)}
            />
        </label>
        <button type='submit'>Log in</button>
    </form>
    { errorMessage && <p>{errorMessage}</p> }
    <p>Don't have an account yet?</p>
    <Link to={"/user/signup"}> Sign Up</Link>
    </div>
  )
}

export default UserLoginComponent