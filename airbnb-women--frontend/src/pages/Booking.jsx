import { useContext, useState, useEffect } from "react";
import { differenceInCalendarDays } from 'date-fns'
import { useNavigate } from "react-router-dom";
import UserContext from '../contexts/UserContext'

export default function Booking({ place }) {

    // hooks
    const navigate = useNavigate();

    const {user} = useContext(UserContext);

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('Gender');
    let numberOfDays = 0;
    if (checkIn && checkOut) {
        numberOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }


    useEffect(() => {
        if(user){
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);
    

    const bookThePlace = async () => {
        const price = numberOfDays * place.price * numberOfGuests;
        const data = {
            name,
            email,
            phone,
            gender,
            numberOfDays,
            numberOfGuests,
            checkIn,
            checkOut,
            place: place, // Include the place object here
            price: price,
            owner: place.owner,
            customer: user._id
        };
    
        console.log(data);
    
        try {
            const response = await fetch('http://localhost:7000/api/booking', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) // Stringify the entire data object
            });
    
            const res_data = await response.json();
    
            if (response.ok) {
                const bookingId = res_data.data._id;
                console.log(res_data);
                alert(`Booking Done for ${place.title}`);
                navigate('/account/bookings/');
            } else {
                alert('Booking not done');
                console.log(response.status);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const formatPrice = (price) => {
        const numPrice = Number(price);
        if (numPrice >= 10000000) {
            return (numPrice / 10000000).toFixed(2) + ' Cr';
        }
        if (numPrice >= 100000) {
            return (numPrice / 100000).toFixed(2) + ' Lakhs';
        }
        if (numPrice >= 1000) {
            return (numPrice / 1000).toFixed(2) + ' K';
        }
        return numPrice.toLocaleString();
    };

    return (
        <div className="bg-white shadow shadow-gray-300 p-4 rounded-2xl">
            <div className="text-2xl text-center">
                Price : {place.price}rs / per night
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className="py-4 px-4">
                        <label>Check in:</label>
                        <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                    </div>
                    <div className="py-4 px-4 border-l">
                        <label>Check out:</label>
                        <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                    </div>
                </div>
                <div className="py-4 px-4 border-l">
                    <label>Number of guests:</label>
                    <input type="number" value={numberOfGuests} onChange={(e) => setNumberOfGuests(e.target.value)} />
                </div>
            </div>
            {
                numberOfDays > 0 && (
                    <div>
                        <div className="py-3 px-4 border-t">
                            <label htmlFor="">Your full name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                        </div>
                        <div className="py-3 px-4 border-t">
                            <label htmlFor="">Your Email Address</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="py-3 px-4 border-t">
                            <label htmlFor="">Your Phone Number</label>
                            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className="border-t px-4 py-3 ">
                        <button id="genderDefaultButton" data-dropdown-toggle="dropdown" class="bg-white shadow border-2 rounded-lg px-3 py-2.5 text-center inline-flex items-center" type="button" 
                                    
                                    onClick={() => {
                                        var gender = document.getElementById('gender');
                                        gender.classList.toggle('hidden');
                                    }}>
                                    
                                    {gender}
                                    
                                    <svg class="w-3.5 h-3.5 mt-2 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                        </svg>
                                    </button>

                                    <div id="gender" class="z-10 hidden bg-white divide-y rounded-lg shadow w-44">
                                        <ul class="w-fit px-3 pb-3 mt-3 overflow-y-auto dark:text-white" aria-labelledby="dropdownDefaultButton">
                                                    <li onClick={() => {
                                                        setGender('female')
                                                        var gender = document.getElementById('gender');
                                        gender.classList.toggle('hidden');
                                                        }}>
                                                        <p class="block px-4 py-2 cursor-pointer">female</p>
                                                    </li>
                                        </ul>
                                    </div>
                        </div>
                    </div>
                )
            }
            <button className="primary mt-4" onClick={bookThePlace}>
                Book this place
                {
                    numberOfDays > 0 && (
                        <span>{`: ` + formatPrice(numberOfDays * place.price * numberOfGuests)}</span>
                    )
                }
            </button>
        </div>
    )
}