import { Request, Response } from "express";
import { UsuarioRepository } from "../models/UsuarioRepository";

const repository = new UsuarioRepository();

export class AuthController {


    static loginPage(req: Request, res: Response): void {

        res.render("login", {
            mensagem: null
        });

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

                res.render("login", {
                    mensagem: "Email ou senha inválidos."
                });
            
                return;
            }


            req.session.usuarioId = usuario.id;
            res.render("login", {
                mensagem: "Login realizado com sucesso!"
            });


        } catch (erro: any) {


            res.render("login", {
                mensagem: erro.message
            });


        }

    }



    static logout(req: Request, res: Response): void {

        req.session.destroy((erro) => {
    
            if (erro) {
    
                res.status(500).send("Erro ao realizar logout.");
    
                return;
    
            }
    
    
            res.redirect("/login");
    
        });
    
    }

    }
