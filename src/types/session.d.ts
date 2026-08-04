import 'express-session';

declare module 'express-session' {
  interface SessionData {
    usuarioId?: number;
    flash?: string;
    usuario?: {
      id: number;
      nome: string;
      email: string;
    };
  }
}