import { Router } from "express";
import { getPlaceById, getPlaces, getPlacesByOwner, uploadByLink, uploadPlace } from "../controllers/place.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post('/upload-by-link', uploadByLink);
router.post('/upload', upload.fields([
    {
        name: "photos",
        maxCount: 10
    },
]), uploadPlace);
router.get('/get-places-by-owner', getPlacesByOwner);
router.get('/', getPlaces);
router.get('/place-by-id', getPlaceById);

export default router;