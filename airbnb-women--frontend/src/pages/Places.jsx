import { Link, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form'
import Perks from "../Perks";
import { useContext, useEffect, useState } from "react";
import UserContext from '../contexts/UserContext'

export default function Places() {

    const { action } = useParams();
    const {user} = useContext(UserContext);

    const {handleSubmit} = useForm();

    // input data
    const {id} = useParams();
    console.log(id);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [price, setPrice] = useState(10000);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [files, setFiles] = useState([]);

    // buttons settings
    const [submitting, setSubmitting] = useState(false);
    console.log(user);

    // added photos by link
    // async function addPhotosByLink() {

    //     if (photoLink == '') {
    //         alert('Provide the url');
    //     }

    //     try {
    //         setUploading(true);
    //         const response = await fetch('http://localhost:7000/api/place/upload-by-link', {
    //             method: "POST",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 link: photoLink
    //             })
    //         })

    //         const res_data = await response.json();

    //         if (response.ok) {
    //             alert('image uploaded!');
    //             console.log(res_data.data);
    //             setUploading(false);

    //             // adding the photo to addedPhotos array
    //             setAddedPhotos(prev => [...prev, res_data.data])
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         setUploading(false);
    //     }

    // }

    const onSubmit = async () => {
        console.log(perks);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("address", address);
        formData.append("extraInfo", extraInfo);
        formData.append("price", price);
        formData.append("checkIn", checkIn);
        formData.append("checkOut", checkOut);
        formData.append("maxGuests", maxGuests);
        formData.append("owner", user._id);

        // Append photos
        for (let i = 0; i < files.length; i++) {
            formData.append("photos", files[i]);
        }

        // append perks
        for(let i=0; i<perks.length; i++){
            formData.append("perks", perks[i]);
        }

        console.log(formData);

        try {
            setSubmitting(true);
            const response = await fetch('http://localhost:7000/api/place/upload', {
                method: "POST",
                body: formData
            })

            if (response.ok) {
                alert('Place Added Successfully!');
                console.log("Place data inserted successfully!");
                setSubmitting(false);
            } else {
                alert("Same Data Found!");
                console.log("Data not inserted ", response.text);
                console.log(response);
                setSubmitting(false);
            }
        } catch (error) {
            setSubmitting(false);
            console.log(
                "Some problem occrred while submitting the palce",
                error
            );
        }
    }

    const [places, setPlaces] = useState([])

    useEffect(() => {
        if(user){
            setOwnerPlaces();
        }
    }, [user]);

    const setOwnerPlaces = async() => {
        try{
            const response = await fetch(`http://localhost:7000/api/place/get-places-by-owner/?id=${user._id}`, {
                method: "GET",
                headers: {
                    'Content-Type' : 'application/json'
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

    return (
        <div>
            {
                action !== 'new' && (
                    <div className="text-center">
                        <div className="text-start">
                            {
                                places && places.map((place, index) => (
                                    <Link to={'/account/places/'+place._id}>
                                    <div className="bg-slate-200 flex gap-4 rounded-2xl p-4 my-4 cursor-pointer transform transition duration-500 
                                        hover:scale-95">
                                        <div className="w-32 h-32 bg-slate-300 grow shrink-0 rounded-xl">
                                            <img src={place.photos[0]} alt="" className=" object-fill w-full h-full rounded-xl" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold">{place.title}</h2>
                                            <p className="text-sm mt-2">{place.description}</p>
                                        </div>
                                    </div>
                                    </Link>
                                ))
                            }
                        </div>
                        <Link className="inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full" to={'/account/places/new'}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                            </svg>

                            Add new Place
                        </Link>
                    </div>
                )
            }
            {
                action === 'new' && (
                    <div>
                        <form action="" onSubmit={handleSubmit(onSubmit)}>
                            {/* title */}
                            <h2 className="text-2xl mt-4">Title</h2>
                            <p className="text-gray-500 text-sm">Title for your place should be short and catchy as in the advertisement</p>
                            <input type="text" placeholder="title, for example: My love" value={title} onChange={e => setTitle(e.target.value)} />

                            {/* address */}
                            <h2 className="text-2xl mt-4">Address</h2>
                            <input type="text" placeholder="Enter the address" value={address} onChange={e => setAddress(e.target.value)} />

                            {/* photos */}
                            <h2 className="text-2xl mt-4">Photos</h2>
                            <div className="my-4">
                                        <input
                                            type="file"
                                            onChange={(e) => {
                                                setFiles(e.target.files);
                                            }}
                                            multiple
                                            className="cursor-pointer flex gap-1 justify-center items-center border bg-transparent rounded p-4 text-gray-500"
                                            id="file-input"
                                        />
                                </div>
                            {/* <div className="flex gap-2">
                                <input type="text" placeholder={'Add using a link ....jpg'} value={photoLink} onChange={e => setPhotoLink(e.target.value)} />
                                <button onClick={addPhotosByLink} className="w-32 bg-gray-200 grow px-4 gap-2 rounded-2xl hover:bg-gray-300">{uploading ? 'Uploading' : 'Add Photo'}</button>
                            </div>
                            <div className="grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-3">
                                {
                                    addedPhotos.length > 0 && addedPhotos.map(link => (
                                        <div>
                                            <img className="rounded-2xl" src={'http://localhost:7000/api/place/uploads'+link} alt="" />
                                        </div>
                                    ))
                                }
                                
                            </div> */}

                            {/* description */}
                            <h2 className="text-2xl mt-4">Description</h2>
                            <p className="text-gray-500 text-sm">Description of the place</p>
                            <textarea className="w-full rounded-2xl h-32 border border-gray-200" value={description} onChange={e => setDescription(e.target.value)} />

                            {/* Perks */}
                            <h2 className="text-2xl mt-4">Perks</h2>
                            <p className="text-gray-500 text-sm">Select all the perks of your place</p>
                            <div className="grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                                <Perks selected={perks} onChange={setPerks} />
                            </div>

                            {/* extra Info */}
                            <h2 className="text-2xl mt-4">Extra Info</h2>
                            <p className="text-gray-500 text-sm">House rules, etc.</p>
                            <input type="text" placeholder=".." value={extraInfo} onChange={e => setExtraInfo(e.target.value)} />

                            {/* Check In & Out Times */}
                            <h2 className="text-2xl mt-4">Check In & Check Out Times</h2>
                            <p className="text-gray-500 text-sm">Add Check in and out times, remember to have some time window for clearing the room between guest </p>
                            <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                                <div>
                                    <h3 className="mt-2 -mb-1">Check In Time</h3>
                                    <input type="text" placeholder="14:00" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
                                </div>
                                <div>
                                    <h3 className="mt-2 -mb-1">Check Out Time</h3>
                                    <input type="text" placeholder="17:00" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
                                </div>
                                <div>
                                    <h3 className="mt-2 -mb-1">Max Number of guests</h3>
                                    <input type="number" placeholder="5" value={maxGuests} onChange={e => setMaxGuests(e.target.value)} />
                                </div>
                                <div>
                                    <h3 className="mt-2 -mb-1">Price Per Night</h3>
                                    <input type="number" placeholder="0" value={price} onChange={e => setPrice(e.target.value)} />
                                </div>
                            </div>
                            <button className="primary my-4">{submitting ? 'Submitting...' : 'Submit'}</button>
                        </form>
                    </div>
                )
            }
        </div>
    );
}