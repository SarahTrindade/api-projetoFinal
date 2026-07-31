import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();

router.post("/cadastro", AuthController.cadastro);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);

export default router;