import { Request, Response, NextFunction } from "express";

export function verificarLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const usuario = req.session.usuario;

  if (!usuario) {
    return res.status(401).json({
      sucesso: false,
      mensagem: "Usuário não autenticado."
    });
  }

  next();
}