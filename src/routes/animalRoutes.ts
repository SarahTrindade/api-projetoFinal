import { Router } from "express";
import { AnimalController } from "../controllers/AnimalController";
import { verificarLogin } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", verificarLogin, AnimalController.listar);
router.get("/:id", verificarLogin, AnimalController.buscarPorId);
router.post("/", verificarLogin, AnimalController.cadastrar);
router.put("/:id", verificarLogin, AnimalController.atualizar);
router.delete("/:id", verificarLogin, AnimalController.excluir);

export default router;