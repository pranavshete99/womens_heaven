import { useEffect, useState } from "react"
import Header from "../Header"
import { Link } from "react-router-dom";

const IndexPage = () => {

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getPlaces();
  }, [places]);

  const getPlaces = async () => {
    try{
      const response = await fetch('http://localhost:7000/api/place/', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const res_data = await response.json();

      if(response.ok){
        console.log(res_data);
        setPlaces(res_data.data);
      }
    }
    catch(error){
      console.log(error);
    }
  }

  const formatPrice = (price) => {
    const numPrice = Number(price);
    if (numPrice >= 10000000) {
        return (numPrice / 10000000).toFixed(2) + ' Cr';
    }
    if (numPrice >= 100000) {
        return (numPrice / 100000).toFixed(2) + ' Lakhs';
    }
    return numPrice.toLocaleString();
};


  return (
    <div className="mt-8 grid gap-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.map((place, index) => (
        <Link key={index} to={'/place/'+place._id}>
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
            <img className="rounded-2xl object-cover aspect-square" src={place.photos[0]} alt={`Photo ${index}`} />
          </div>
          <h3 className="font-bold">{place.address}</h3>
          <h2 className="text-sm text-gray-500">{place.title}</h2>
          <div className="mt-2"><span className="font-bold">{formatPrice(place.price)}</span> per night</div>
        </Link>
      ))}
    </div>
  )
}

export default IndexPage