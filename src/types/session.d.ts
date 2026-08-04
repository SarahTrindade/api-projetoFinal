import 'express-session';

declare module 'express-session' {
  interface SessionData {
    usuarioId?: number;
    usuario?: {
      id: number;
      nome: string;
      email: string;
    };
  }
}