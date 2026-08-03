import { Router } from "express";
import { UsuarioRepository } from "../models/UsuarioRepository";

const router = Router();
const repository = new UsuarioRepository();

router.post("/cadastro", async (req, res) => {
    // cadastro...
});

router.post("/login", async (req, res) => {
    const { email, senha } = req.body;

    const usuario = await repository.validarLogin(email, senha);

    if (!usuario) {
        return res.status(401).json({
            sucesso: false,
            mensagem: "E-mail ou senha inválidos."
        });
    }

    res.json({
        sucesso: true,
        usuario: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        }
    });
});

export default router;