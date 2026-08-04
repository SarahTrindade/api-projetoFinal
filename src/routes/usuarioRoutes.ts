import { Router } from "express";
import { UsuarioRepository } from "../models/UsuarioRepository";
import { verificarLogin } from "../middlewares/authMiddleware";
const router = Router();
const repository = new UsuarioRepository();

router.get("/perfil", verificarLogin, (req, res) => {
    res.json({
        sucesso: true,
        usuario: req.session.usuario
    });
});

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

router.post("/login", async (req, res) => {
    const { email, senha } = req.body;

    // Validação dos campos
    if (!email || !senha) {
        return res.status(200).json({
            sucesso: true,
            mensagem: "Login realizado com sucesso.",
            usuario: req.session.usuario
        });
    }

    try {
        const usuario = await repository.validarLogin(email, senha);

        if (!usuario) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "E-mail e senha são obrigatórios."
            });
        }

        req.session.usuario = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        };

        res.status(200).json({
            sucesso: true,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        });
    } catch (erro: any) {
        res.status(500).json({
            sucesso: false,
            mensagem: erro.message
        });
    }
});

export default router;