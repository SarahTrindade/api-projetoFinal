import { Router } from "express";
import { AnimalController } from "../controllers/AnimalController";
import { verificarLogin } from "../middlewares/authMiddleware";
import upload from "../middlewares/uploadMiddleware";

const router = Router();

router.get("/", verificarLogin, AnimalController.listar);
router.get("/:id", verificarLogin, AnimalController.buscarPorId);
router.post("/", verificarLogin, upload.single("foto"), AnimalController.cadastrar);
router.put("/:id", verificarLogin, upload.single("foto"), AnimalController.atualizar);
router.delete("/:id", verificarLogin, AnimalController.excluir);

export default router;