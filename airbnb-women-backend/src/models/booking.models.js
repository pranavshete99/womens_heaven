import mongoose from 'mongoose'

const bookingSchema = mongoose.Schema({
    place: {
        type: mongoose.Schema.Types.Mixed,
        ref: 'Place',
        required: true,
    },
    name : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
    },
    price: {
        type: Number,
    },
    checkIn: {
        type: Date,
        required: true,
    },
    checkOut: {
        type: Date,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        red: 'User',
    }
    
})

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;