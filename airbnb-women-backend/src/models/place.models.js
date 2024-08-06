import mongoose from 'mongoose'

const placeSchema = mongoose.Schema({
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type : String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    photos: [
        {
            type: String,
        }
    ],
    description :{
        type: String,
        required: true,
    },
    perks: [{
        type: String,
    },],
    price: {
        type: Number,
    },
    extraInfo: {
        type: String,
    },
    checkIn: {
        type: String,
    },
    checkOut: {
        type: String,
    },
    maxGuests: {
        type: Number
    }
});

const Place = mongoose.model('Place', placeSchema);

export default Place;