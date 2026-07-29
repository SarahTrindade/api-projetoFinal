import { Request, Response } from "express";
import { VeterinarioRepository } from "../models/VeterinarioRepository";

const repository = new VeterinarioRepository();

export class VeterinarioController {

    static async listar(req: Request, res: Response): Promise<void> {
        const termo = req.query.q as string | undefined;

        const veterinarios = await repository.listar(termo);

        res.status(200).json(veterinarios);
    }

    static async buscarPorId(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);

        const veterinario = await repository.buscarPorId(id);

        if (!veterinario) {
            res.status(404).json({
                mensagem: "Veterinário não encontrado."
            });
            return;
        }

        res.status(200).json(veterinario);
    }

    static async cadastrar(req: Request, res: Response): Promise<void> {
        try {
            const {
                nome,
                crmv,
                especialidade,
                telefone
            } = req.body;

            const veterinario = await repository.criar(
                nome,
                crmv,
                especialidade,
                telefone
            );

            res.status(201).json({
                mensagem: "Veterinário cadastrado com sucesso!",
                veterinario
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

            const veterinario = await repository.atualizar(id, req.body);

            if (!veterinario) {
                res.status(404).json({
                    mensagem: "Veterinário não encontrado."
                });
                return;
            }

            res.status(200).json({
                mensagem: "Veterinário atualizado com sucesso!",
                veterinario
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
                mensagem: "Veterinário não encontrado."
            });
            return;
        }

        res.status(200).json({
            mensagem: "Veterinário removido com sucesso!"
        });
    }
}