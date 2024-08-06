import Place from "../models/place.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import imageDownloader from 'image-downloader'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const uploadByLink = asyncHandler(async (req, res) => {
    const {link} = req.body;

    if(!link || link == ''){
        throw new ApiError(400, "Provide url for upload");
    }

    const newName = 'photo' + Date.now() + '.jpg'

    const __dirname = dirname(fileURLToPath(import.meta.url));

    await imageDownloader.image(
        {
            url: link,
            dest: __dirname.slice(0, -11) + '/uploads/' + newName
        }
    )
    return res.status(200)
    .json(new ApiResponse(200, newName, "image downloaded"))
});

const uploadPlace = asyncHandler(async (req, res) => {
    const existingPlace = await Place.findOne({
        title: req.body.title,
        address: req.body.address,
    });

    if (existingPlace) {
        return res.status(400).json({ message: 'Place already exists' });
    }

    let placePhotosLocalPaths = [];
    if (
        req.files && Array.isArray(req.files.photos) && req.files.photos.length > 0
    ) {
        placePhotosLocalPaths = req.files.photos.map(image => image.path);
    }
        
    const placePhotos = await Promise.all(placePhotosLocalPaths.map(uploadOnCloudinary));

    if(placePhotos.length < 1){
        throw new ApiError(400, "Place Photos not added");
    }

    req.body.photos = placePhotos.map(photo => photo.secure_url);

    const place = await Place.create(req.body);

    return res.status(200)
    .json(new ApiResponse(200, place, "Place Uploaded"));

})

const getPlacesByOwner = asyncHandler(async(req, res) => {
    const id = req.query.id;
    
    const places = await Place.find({owner: id});

    return res.status(200).json(new ApiResponse(200, places, "Places according to owner"));
})

const getPlaces = asyncHandler(async(req, res) => {    
    const places = await Place.find();

    if(!places){
        throw new ApiError(404, "places not found");
    }

    return res.status(200).json(new ApiResponse(200, places, "Places according to owner"));
})

const getPlaceById = asyncHandler(async(req, res) => {
    const id = req.query.id;   
    const place = await Place.findById(id);

    if(!place){
        throw new ApiError(404, "place not found");
    }

    return res.status(200).json(new ApiResponse(200, place, "Places according to owner"));
})

export {uploadByLink, uploadPlace, getPlacesByOwner, getPlaces, getPlaceById};