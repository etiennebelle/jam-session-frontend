import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div>
        <h1>Oops! You seem to be lost.</h1>
        <p>Here are some helpful links:</p>
        <Link to='/'>Home</Link>
        <Link to='/events'>Jam Sessions</Link>
    </div>
  )
}

export default NotFound