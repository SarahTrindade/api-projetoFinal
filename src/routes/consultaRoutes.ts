import { Router } from "express";
import { Consulta } from "../entities/Consulta";

const router = Router();

// Banco temporário em memória (depois pode trocar por JSON igual ReceitaRepository)
let consultas: Consulta[] = [];

// GET - listar todas as consultas
router.get("/", (req, res) => {
    res.json(consultas.map(c => c.toJSON()));
});


// GET - buscar consulta por id
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    const consulta = consultas.find(c => c.id === id);

    if (!consulta) {
        return res.status(404).json({
            erro: "Consulta não encontrada"
        });
    }

    res.json(consulta.toJSON());
});


// POST - criar consulta
router.post("/", (req, res) => {
    const erros = Consulta.validar(req.body);

    if (erros.length > 0) {
        return res.status(400).json({
            erros
        });
    }

    const novaConsulta = new Consulta(
        consultas.length + 1,
        req.body.data,
        req.body.hora,
        req.body.motivo,
        req.body.status
    );

    consultas.push(novaConsulta);

    res.status(201).json(novaConsulta.toJSON());
});


// PUT - atualizar consulta
router.put("/:id", (req, res) => {
    const id = Number(req.params.id);

    const consulta = consultas.find(c => c.id === id);

    if (!consulta) {
        return res.status(404).json({
            erro: "Consulta não encontrada"
        });
    }

    if (req.body.data) {
        consulta.data = req.body.data;
    }

    if (req.body.hora) {
        consulta.hora = req.body.hora;
    }

    if (req.body.motivo) {
        consulta.motivo = req.body.motivo;
    }

    if (req.body.status) {
        consulta.status = req.body.status;
    }

    res.json(consulta.toJSON());
});


// DELETE - excluir consulta
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = consultas.findIndex(c => c.id === id);

    if (index === -1) {
        return res.status(404).json({
            erro: "Consulta não encontrada"
        });
    }

    consultas.splice(index, 1);

    res.json({
        mensagem: "Consulta removida com sucesso"
    });
});


export default router;