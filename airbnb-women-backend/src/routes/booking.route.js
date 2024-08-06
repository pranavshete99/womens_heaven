import { Router } from "express";
import { createBooking, getBookingsByUserId } from "../controllers/booking.controller.js";
import { verifyjwt } from "../middlewares/auth.middlewares.js";

const router = Router();

router.post('/', createBooking);
router.get('/all', verifyjwt, getBookingsByUserId);

export default router;