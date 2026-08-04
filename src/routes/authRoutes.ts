import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();
router.get("/login", AuthController.loginPage); 

router.post("/cadastro", AuthController.cadastro);
router.post("/login", AuthController.login);
router.get("/logout", AuthController.logout);

export default router;