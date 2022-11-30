import { useEffect, useState } from "react";                      
import { Link } from "react-router-dom";

function AllLocationsPage() {
    const [allLocations, setAllLocations] = useState([])

    const fetchLocations = async() => {
        try {
            const allLocations = await fetch(`${process.env.REACT_APP_API_URL}locations`)
            const allLocationsData = await allLocations.json();
            setAllLocations(allLocationsData)
        } catch (error) {
            console.log(error)
        }
     }

     useEffect(() => {
        fetchLocations()
     }, [])
     
  return (
    <div>
        <h2>Jam Sessions Locations:</h2>
        {allLocations.map((oneLocation) => {
            return(
                <div key={oneLocation._id}>
                <h3><Link to={`/locations/${oneLocation._id}`}>{oneLocation.barName}</Link></h3>
                <p>{oneLocation.address}</p>
                <p>{oneLocation.town}</p>
                </div>
            )
        })}
    </div>
  ) 
}

export default AllLocationsPage