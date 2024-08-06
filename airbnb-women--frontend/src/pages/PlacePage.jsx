import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Booking from "./Booking";

export default function PlacePage() {
    const { id } = useParams();

    const [place, setPlace] = useState({});
    let [showAllPhotos, setShowAllPhotos] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        getPlaceInfo();
    }, [id]);

    const getPlaceInfo = async () => {
        try {
            const response = await fetch(`http://localhost:7000/api/place/place-by-id/?id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const res_data = await response.json();

            if (response.ok) {
                console.log(res_data);
                setPlace(res_data.data);
            }

        }
        catch (error) {
            console.log(error);
        }
    }

    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 text-white min-h-screen">
                <div className="bg-black p-8 grid gap-4">
                <div>
                    <h2 className="text-3xl ">Photos of {place.title}</h2>
                    <button onClick={() => setShowAllPhotos(false)} className="fixed right-7 top-6 flex gap-2 py-2 px-4 rounded-2xl shadow shadow-black text-black bg-white "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                        Close Photos
                    </button>
                </div>
                {
                    place.photos.map((photo) => (
                        <div>
                            <img src={photo} alt="" />
                        </div>
                    ))
                }
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
                <h1 className="text-3xl">{place.title}</h1>
                <a className="flex gap-1 my-3 font-semibold underline" target="_blank" href={`https://maps.google.com/?=` + place.address}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
</svg>
{place.address}</a>
                <div className="relative">
                    <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden cursor-pointer" onClick={() => setShowAllPhotos(true)}>
                        <div>
                            {place.photos && place.photos.length > 0 && (
                                <img className="aspect-square object-cover" src={place.photos[0]} alt="" />
                            )}
                        </div>
                        <div className="grid gap-2">
                            {place.photos && place.photos.length > 0 && (
                                <img className="aspect-square object-cover" src={place.photos[1]} alt="" />
                            )}
                            {place.photos && place.photos.length > 0 && (
                                <img className="aspect-square object-cover" src={place.photos[2]} alt="" />
                            )}
                        </div>
                    </div>
                    <button onClick={() => setShowAllPhotos(true)} className="absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-gray-500 flex gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                        show more photos</button>
                </div>
                <div className="mt-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                    <div>
                        <div className="my-4 ">
                            <h2 className="font-semibold text-2xl ">Description</h2>
                            {place.description}
                        </div>
                        Check-in : {place.checkIn} <br/>
                        Check-out : {place.checkOut} <br/>
                        Max Number of Guests : {place.maxGuests}
                        
                    </div>
                    <div>
                        <Booking place={place} />
                    </div>
                </div>
                <div className="font-semibold text-2xl ">
                    <h2>Extra Info</h2>
                <div className="text-sm text-gray-500 mt-2">
                            {place.extraInfo}
                        </div>
                </div>
            </div>
        </>
    );
}