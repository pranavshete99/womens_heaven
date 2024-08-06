import { useEffect } from "react";
import AccountNav from "./AccountNav";
import { useState } from "react";
import { differenceInCalendarDays, format } from "date-fns";

export default function BookingsList() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        getBookings();
    }, []);

    const getBookings = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:7000/api/booking/all', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            const res_data = await response.json();
            if (response.ok) {
                console.log(res_data);
                setBookings(res_data.data);
                // Fetch places for each booking
                res_data.data.forEach(booking => getPlaces(booking.place));
                console.log("Bookings added");
            }
            else {
                console.log(response.status);
            }
        } catch (error) {
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
        if (numPrice >= 1000) {
            return (numPrice / 1000).toFixed(2) + ' K';
        }
        return numPrice.toLocaleString(); 
    };

    return (
        <div>
            <AccountNav />
            <div>
                {bookings.map((booking, index) => (
                    <div className="border border-gray-200 mt-4 flex gap-4 items-center bg-gray-200 rounded-2xl overflow-hidden">
                        <div className="w-36 h-36">
                            <img className="object-fill w-full h-full rounded-l-xl" key={index} src={booking.place.photos[0]} alt="" />
                        </div>
                        <div className="py-3 pr-3 grow">
                            <h2 className="font-bold">{booking.place.title}</h2>
                            <div className="flex gap-2 border-t border-gray-300 mt-2 py-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                </svg>
                                {format(new Date(booking.checkIn), 'dd-MM-yyyy')} to <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                </svg>
                                {format(new Date(booking.checkIn), 'dd-MM-yyyy')}
                            </div>
                            <div className="flex gap-2">
                                {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} Nights <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                </svg>
                                |
                                Total Price : {formatPrice(booking.place.price)}<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
