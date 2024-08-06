import { Router } from "express";
import {createUser, loginUser, logoutUser, userProfile} from '../controllers/user.controllers.js'
import { verifyjwt } from "../middlewares/auth.middlewares.js";

const router = Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.post('/logout', verifyjwt, logoutUser);
router.post('/profile', verifyjwt, userProfile);

export default router;