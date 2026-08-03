import { readFile, writeFile } from "fs/promises";
import bcrypt from "bcrypt";
import { Usuario } from "../entities/Usuario";

export class UsuarioRepository {
  private arquivo: string;

  constructor(arquivo: string = "dados/usuarios.json") {
    this.arquivo = arquivo;
  }

  async carregar(): Promise<Usuario[]> {
    try {
      const texto = await readFile(this.arquivo, "utf-8");
      const dados = JSON.parse(texto);
      return dados.map((d: any) => Usuario.fromJSON(d));
    } catch {
      await this.salvar([]);
      return [];
    }
  }

  async salvar(usuarios: Usuario[]): Promise<void> {
    const json = usuarios.map((u) => u.toJSON());
    await writeFile(this.arquivo, JSON.stringify(json, null, 2));
  }

  async listar(): Promise<Usuario[]> {
    return this.carregar();
  }

  async buscarPorEmail(email: string): Promise<Usuario | undefined> {
    const usuarios = await this.carregar();

    return usuarios.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
  }

  async criar(
    nome: string,
    email: string,
    senha: string
  ): Promise<Usuario> {

    const erros = Usuario.validar({
      nome,
      email,
      senha,
    });

    if (erros.length > 0) {
      throw new Error(erros.join(", "));
    }

    const usuarios = await this.carregar();

    const emailExiste = usuarios.some((u) => u.email === email);

if (emailExiste) {
      throw new Error("E-mail já cadastrado.");
    }

    const ultimo = usuarios.at(-1);
    const novoId = (ultimo?.id ?? 0) + 1;

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = new Usuario(
      novoId,
      nome.trim(),
      email.trim().toLowerCase(),
      senhaHash
    );

    usuarios.push(usuario);

    await this.salvar(usuarios);

    return usuario;
  }

  async validarLogin(
    email: string,
    senha: string
  ): Promise<Usuario | null> {

    const usuario = await this.buscarPorEmail(email);

    if (!usuario) {
      return null;
    }

    const senhaCorreta = await bcrypt.compare(
      senha,
      usuario.senha
    );

    if (!senhaCorreta) {
      return null;
    }

    return usuario;
  }
}