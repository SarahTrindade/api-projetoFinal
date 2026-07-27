import { Request, Response } from "express";
import { AnimalRepository } from "../models/AnimalRepository";

const repository = new AnimalRepository();

export class AnimalController {

    static async listar(req: Request, res: Response): Promise<void> {
        const termo = req.query.q as string | undefined;

        const animais = await repository.listar(termo);

        res.status(200).json(animais);
    }

    static async buscarPorId(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);

        const animal = await repository.buscarPorId(id);

        if (!animal) {
            res.status(404).json({ mensagem: "Animal não encontrado." });
            return;
        }

        res.status(200).json(animal);
    }

    static async cadastrar(req: Request, res: Response): Promise<void> {
        try {
            const { nome, especie, idade, peso } = req.body;

            const animal = await repository.criar(
                nome,
                especie,
                Number(idade),
                Number(peso)
            );

            res.status(201).json({
                mensagem: "Animal cadastrado com sucesso!",
                animal
            });

        } catch (erro: any) {
            res.status(400).json({
                mensagem: erro.message
            });
        }
    }

    static async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);

            const animal = await repository.atualizar(id, req.body);

            if (!animal) {
                res.status(404).json({
                    mensagem: "Animal não encontrado."
                });
                return;
            }

            res.status(200).json({
                mensagem: "Animal atualizado com sucesso!",
                animal
            });

        } catch (erro: any) {
            res.status(400).json({
                mensagem: erro.message
            });
        }
    }

    static async excluir(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);

        const removido = await repository.remover(id);

        if (!removido) {
            res.status(404).json({
                mensagem: "Animal não encontrado."
            });
            return;
        }

        res.status(200).json({
            mensagem: "Animal removido com sucesso!"
        });
    }
}