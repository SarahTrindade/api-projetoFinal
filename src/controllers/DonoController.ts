import { Request, Response } from "express";
import { DonoRepository } from "../models/DonoRepository";

const repository = new DonoRepository();

export class DonoController {

  static async listar(req: Request, res: Response): Promise<void> {
    try {
      const termo = req.query.q as string | undefined;
      const donos = await repository.listar(termo);

      res.status(200).json(donos.map(d => d.toJSON()));
    } catch (error: any) {
      res.status(500).json({ erro: error.message });
    }
  }

  static async buscarPorId(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      const dono = await repository.buscarPorId(id);

      if (!dono) {
        res.status(404).json({ erro: "Dono não encontrado." });
        return;
      }

      res.status(200).json(dono.toJSON());
    } catch (error: any) {
      res.status(500).json({ erro: error.message });
    }
  }

  static async criar(req: Request, res: Response): Promise<void> {
    try {
      const {
        nome,
        telefone,
        email,
        endereco
      } = req.body;

      const novo = await repository.criar(
        nome,
        telefone,
        email,
        endereco
      );

      res.status(201).json(novo.toJSON());
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }

  static async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      const atualizado = await repository.atualizar(id, req.body);

      if (!atualizado) {
        res.status(404).json({ erro: "Dono não encontrado." });
        return;
      }

      res.status(200).json(atualizado.toJSON());
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }

  static async remover(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      const removido = await repository.remover(id);

      if (!removido) {
        res.status(404).json({ erro: "Dono não encontrado." });
        return;
      }

      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ erro: error.message });
    }
  }

}