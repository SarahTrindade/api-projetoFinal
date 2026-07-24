import { readFile, writeFile } from "fs/promises";
import { Dono } from "../entities/Dono";

export class DonoRepository {
  private arquivo: string;

  constructor(arquivo: string = "dados/donos.json") {
    this.arquivo = arquivo;
  }

  async carregar(): Promise<Dono[]> {
    try {
      const texto = await readFile(this.arquivo, "utf-8");
      const dados = JSON.parse(texto);
      return dados.map((d: any) => Dono.fromJSON(d));
    } catch {
      await this.salvar([]);
      return [];
    }
  }

  async salvar(donos: Dono[]): Promise<void> {
    const json = donos.map(d => d.toJSON());
    await writeFile(this.arquivo, JSON.stringify(json, null, 2));
  }

  async listar(termo?: string): Promise<Dono[]> {
    let donos = await this.carregar();

    if (termo && termo.trim()) {
      const t = termo.toLowerCase();

      donos = donos.filter(d =>
        d.nome.toLowerCase().includes(t) ||
        d.telefone.toLowerCase().includes(t) ||
        d.email.toLowerCase().includes(t)
      );
    }

    return donos;
  }

  async buscarPorId(id: number): Promise<Dono | undefined> {
    const donos = await this.carregar();
    return donos.find(d => d.id === id);
  }

  async criar(
    nome: string,
    telefone: string,
    email: string,
    endereco: string
  ): Promise<Dono> {

    // Validação da entidade
    const erros = Dono.validar({
      nome,
      telefone,
      email,
      endereco,
    });

    if (erros.length > 0) {
      throw new Error(erros.join(", "));
    }

    const donos = await this.carregar();

    const ultimo = donos.at(-1);
    const novoId = (ultimo?.id ?? 0) + 1;

    const novo = new Dono(
      novoId,
      nome.trim(),
      telefone.trim(),
      email.trim(),
      endereco.trim()
    );

    donos.push(novo);

    await this.salvar(donos);

    return novo;
  }

  async atualizar(
    id: number,
    dados: {
      nome?: string;
      telefone?: string;
      email?: string;
      endereco?: string;
    }
  ): Promise<Dono | null> {

    const donos = await this.carregar();

    const dono = donos.find(d => d.id === id);

    if (!dono) return null;

    if (dados.nome) dono.nome = dados.nome;
    if (dados.telefone) dono.telefone = dados.telefone;
    if (dados.email) dono.email = dados.email;
    if (dados.endereco) dono.endereco = dados.endereco;

    await this.salvar(donos);

    return dono;
  }

  async remover(id: number): Promise<boolean> {

    const donos = await this.carregar();

    const index = donos.findIndex(d => d.id === id);

    if (index === -1) return false;

    donos.splice(index, 1);

    await this.salvar(donos);

    return true;
  }
} 