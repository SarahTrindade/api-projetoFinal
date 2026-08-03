import { Request, Response, NextFunction } from "express";

export function verificarLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.session.usuario) {
    return res.status(401).json({
      sucesso: false,
      mensagem: "Faça login para acessar esta rota."
    });
  }

  next();
}