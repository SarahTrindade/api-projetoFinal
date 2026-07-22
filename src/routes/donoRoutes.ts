import { Router, Request, Response } from "express";
import { Dono } from "../entities/Dono";

const router = Router();

// Banco temporário em memória
let donos: Dono[] = [];

// GET - listar todos os donos
router.get("/", (req: Request, res: Response) => {
    res.json(donos.map(d => d.toJSON()));
});

// GET - buscar dono por id
router.get("/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const dono = donos.find(d => d.id === id);

    if (!dono) {
        return res.status(404).json({
            erro: "Dono não encontrado"
        });
    }

    res.json(dono.toJSON());
});

// POST - criar dono
router.post("/", (req: Request, res: Response) => {

    const erros = Dono.validar(req.body);

    if (erros.length > 0) {
        return res.status(400).json({ erros });
    }

    const novoDono = new Dono(
        donos.length + 1,
        req.body.nome,
        req.body.telefone,
        req.body.email,
        req.body.endereco
    );

    donos.push(novoDono);

    res.status(201).json(novoDono.toJSON());
});

// PUT - atualizar dono
router.put("/:id", (req: Request, res: Response) => {

    const id = Number(req.params.id);

    const dono = donos.find(d => d.id === id);

    if (!dono) {
        return res.status(404).json({
            erro: "Dono não encontrado"
        });
    }

    if (req.body.nome !== undefined) {
        dono.nome = req.body.nome;
    }

    if (req.body.telefone !== undefined) {
        dono.telefone = req.body.telefone;
    }

    if (req.body.email !== undefined) {
        dono.email = req.body.email;
    }

    if (req.body.endereco !== undefined) {
        dono.endereco = req.body.endereco;
    }

    res.json(dono.toJSON());
});

// DELETE - excluir dono
router.delete("/:id", (req: Request, res: Response) => {

    const id = Number(req.params.id);

    const index = donos.findIndex(d => d.id === id);

    if (index === -1) {
        return res.status(404).json({
            erro: "Dono não encontrado"
        });
    }

    donos.splice(index, 1);

    res.json({
        mensagem: "Dono removido com sucesso"
    });
});

export default router;