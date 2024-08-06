import Booking from "../models/booking.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createBooking = asyncHandler(async(req, res) => {

    console.log(req.body);

    const booking = await Booking.create(req.body);

    if(!booking){
        throw new ApiError(400, "Booking not created!");
    }

    return res.status(200).json(new ApiResponse(200, booking, "Booking created successfully"));
});

const getBookingsByUserId = asyncHandler(async (req, res) => {
    const user = req.user;

    if(!user){
        throw new ApiError(400, 'User not found');
    }

    const bookings = await Booking.find({customer: user._id});

    if(!bookings){
        throw new ApiError(400, 'No Bookings found');
    }

    return res.status(200).json(new ApiResponse(200, bookings, `Bookings by ${user.name}`));

});



export {createBooking, getBookingsByUserId};
