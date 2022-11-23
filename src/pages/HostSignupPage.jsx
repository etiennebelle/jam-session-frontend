function HostSignupPage() {
    const [barName, setBarName] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = event => {
        event.preventDefault();

    }
  return (
    <>
        <form onSubmit={handleSubmit}>
            <label>Bar Name: 
                <input 
                type="text" 
                value={barName} 
                onChange={event => setBarName(event.target.value)} 
                required/>
            </label>
            <label>Address: 
                <input 
                type="text" 
                value={address} 
                onChange={event => setAddress(event.target.value)} 
                required/>
            </label>
            <label>Email: 
                <input 
                type="text" 
                value={email} 
                onChange={event => setEmail(event.target.value)} 
                required/>
            </label>
            <label>Password: 
                <input 
                type="text" 
                value={password} 
                onChange={event => setPassword(event.target.value)} 
                required/>
            </label>
            <button type="submit">Signup</button>
        </form>
    </>
  )
}

export default HostSignupPage