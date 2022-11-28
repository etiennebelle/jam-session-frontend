function JamSession({oneJamSess, deleteJamSess, formatDate}) {
  return (
    <div>
        <img src={oneJamSess.image} />
        <h4>{oneJamSess.jamSessionName}</h4> 
        <p>Date: {formatDate(oneJamSess.date)}</p> 
        <p>Time: {oneJamSess.time}</p> 
        <p>Capacity: {oneJamSess.capacity}</p> 
        <p>Genre: {oneJamSess.genre}</p> 
        <p>Event Description: {oneJamSess.description}</p>
        <button onClick={()=>deleteJamSess(oneJamSess._id)}>Delete Jam Session</button>          
    </div>
  )
}

export default JamSession