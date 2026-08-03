import { Request, Response } from "express";
import { UsuarioRepository } from "../models/UsuarioRepository";

const repository = new UsuarioRepository();

export class AuthController {

    static loginPage(req: Request, res: Response): void {
        res.render("login");
    }

    static async cadastro(req: Request, res: Response): Promise<void> {
        try {
            const { nome, email, senha } = req.body;

            const usuario = await repository.criar(
                nome,
                email,
                senha
            );

            res.status(201).json({
                mensagem: "Usuário cadastrado com sucesso!",
                usuario
            });

        } catch (erro: any) {
            res.status(400).json({
                mensagem: erro.message
            });
        }
    }


    static async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, senha } = req.body;

            const usuario = await repository.validarLogin(
                email,
                senha
            );

            if (!usuario) {
                res.status(401).json({
                    mensagem: "Email ou senha inválidos."
                });
                return;
            }

            res.status(200).json({
                mensagem: "Login realizado com sucesso!",
                usuario
            });

        } catch (erro: any) {
            res.status(400).json({
                mensagem: erro.message
            });
        }
    }


    static async logout(req: Request, res: Response): Promise<void> {
        req.session.destroy((erro) => {
            if (erro) {
                res.status(500).json({
                    mensagem: "Erro ao realizar logout."
                });
                return;
            }
    
            res.status(200).json({
                mensagem: "Logout realizado com sucesso!"
            });
        });
    }
}