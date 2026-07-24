import { Router, Request, Response } from "express";
import { Animal } from "../entities/Animal";

const router = Router();

// Banco temporário em memória
let animais: Animal[] = [];

// GET - listar todos os animais
router.get("/", (req: Request, res: Response) => {
    res.json(animais.map(a => a.toJSON()));
});

// GET - buscar animal por ID
router.get("/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const animal = animais.find(a => a.id === id);

    if (!animal) {
        return res.status(404).json({
            erro: "Animal não encontrado"
        });
    }

    res.json(animal.toJSON());
});

// POST - criar animal
router.post("/", (req: Request, res: Response) => {

    const erros = Animal.validar(req.body);

    if (erros.length > 0) {
        return res.status(400).json({ erros });
    }

    const novoAnimal = new Animal(
        animais.length + 1,
        req.body.nome,
        req.body.especie,
        req.body.idade,
        req.body.peso
    );

    animais.push(novoAnimal);

    res.status(201).json(novoAnimal.toJSON());
});

// PUT - atualizar animal
router.put("/:id", (req: Request, res: Response) => {

    const id = Number(req.params.id);

    const animal = animais.find(a => a.id === id);

    if (!animal) {
        return res.status(404).json({
            erro: "Animal não encontrado"
        });
    }

    if (req.body.nome !== undefined) {
        animal.nome = req.body.nome;
    }

    if (req.body.especie !== undefined) {
        animal.especie = req.body.especie;
    }

    if (req.body.idade !== undefined) {
        animal.idade = req.body.idade;
    }

    if (req.body.peso !== undefined) {
        animal.peso = req.body.peso;
    }

    res.json(animal.toJSON());
});

// DELETE - excluir animal
router.delete("/:id", (req: Request, res: Response) => {

    const id = Number(req.params.id);

    const index = animais.findIndex(a => a.id === id);

    if (index === -1) {
        return res.status(404).json({
            erro: "Animal não encontrado"
        });
    }

    animais.splice(index, 1);

    res.json({
        mensagem: "Animal removido com sucesso"
    });
});

export default router;