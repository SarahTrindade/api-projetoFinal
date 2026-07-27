import { Router } from "express";
import { AnimalController } from "../controllers/AnimalController";

const router = Router();

router.get("/", AnimalController.listar);
router.get("/:id", AnimalController.buscarPorId);
router.post("/", AnimalController.cadastrar);
router.put("/:id", AnimalController.atualizar);
router.delete("/:id", AnimalController.excluir);

export default router;