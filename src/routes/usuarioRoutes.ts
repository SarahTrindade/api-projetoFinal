import { Router } from "express";
import { UsuarioRepository } from "../models/UsuarioRepository";

const router = Router();
const repository = new UsuarioRepository();

router.post("/cadastro", async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const usuario = await repository.criar(nome, email, senha);

        res.status(201).json(usuario);
    } catch (erro: any) {
        res.status(400).json({
            sucesso: false,
            mensagem: erro.message
        });
    }
});

export default router;