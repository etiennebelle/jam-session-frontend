import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


function LocationPage() {
  const [location, setLocation] = useState('');
  const { id } = useParams();


  const fetchLocationDetails = async () => {
    try {
        const response = await fetch(`http://localhost:5005/locations/${id}`);
        const parsed = await response.json();
        setLocation(parsed);  
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    fetchLocationDetails();
  }, [])

  return (
    <div>
      <h3>{location.barName}</h3>
    </div>
  )
}

export default LocationPage