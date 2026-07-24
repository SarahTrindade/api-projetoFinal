// Rotas de Veterinário
// Responsáveis por receber as requisições HTTP e chamar o Repository.

import { Router } from "express";
import { VeterinarioRepository } from "../models/VeterinarioRepository";

const router = Router();
const repository = new VeterinarioRepository();

// Listar veterinários
router.get("/", async (req, res) => {
  try {
    const termo = req.query.busca as string | undefined;
    const veterinarios = await repository.listar(termo);

    res.json(veterinarios);
  } catch {
    res.status(500).json({ erro: "Erro ao listar veterinários." });
  }
});

// Buscar veterinário por ID
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const veterinario = await repository.buscarPorId(id);

    if (!veterinario) {
      return res.status(404).json({ erro: "Veterinário não encontrado." });
    }

    res.json(veterinario);

  } catch {
    res.status(500).json({ erro: "Erro ao buscar veterinário." });
  }
});

// Criar veterinário
router.post("/", async (req, res) => {
  try {

    const { nome, crmv, especialidade, telefone } = req.body;

    const veterinario = await repository.criar(
      nome,
      crmv,
      especialidade,
      telefone
    );

    res.status(201).json(veterinario);

  } catch (erro: any) {

    res.status(400).json({
      erro: erro.message
    });

  }
});

// Atualizar veterinário
router.put("/:id", async (req, res) => {

  try {

    const id = Number(req.params.id);

    const veterinario = await repository.atualizar(id, req.body);

    if (!veterinario) {
      return res.status(404).json({
        erro: "Veterinário não encontrado."
      });
    }

    res.json(veterinario);

  } catch (erro: any) {

    res.status(400).json({
      erro: erro.message
    });

  }

});

// Remover veterinário
router.delete("/:id", async (req, res) => {

  try {

    const id = Number(req.params.id);

    const removido = await repository.remover(id);

    if (!removido) {
      return res.status(404).json({
        erro: "Veterinário não encontrado."
      });
    }

    res.json({
      mensagem: "Veterinário removido com sucesso."
    });

  } catch {

    res.status(500).json({
      erro: "Erro ao remover veterinário."
    });

  }

});

export default router;