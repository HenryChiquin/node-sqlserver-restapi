import { Router } from "express"
import { loginUser } from "../controllers/loginUser.controllers.js"

const router = Router();

router.post("/login", loginUser);

export default router;