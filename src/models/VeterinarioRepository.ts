// Repository: responsável por ler/gravar no JSON
// Usa a classe Veterinario (fromJSON/toJSON)

import { readFile, writeFile } from "fs/promises";
import { Veterinario } from "../entities/Veterinario";

export class VeterinarioRepository {
  private arquivo: string;

  constructor(arquivo: string = "dados/veterinarios.json") {
    this.arquivo = arquivo;
  }

  async carregar(): Promise<Veterinario[]> {
    try {
      const texto = await readFile(this.arquivo, "utf-8");
      const dados = JSON.parse(texto);
      return dados.map((d: any) => Veterinario.fromJSON(d));
    } catch {
      await this.salvar([]);
      return [];
    }
  }

  async salvar(veterinarios: Veterinario[]): Promise<void> {
    const json = veterinarios.map(v => v.toJSON());
    await writeFile(this.arquivo, JSON.stringify(json, null, 2));
  }

  async listar(termo?: string): Promise<Veterinario[]> {
    let veterinarios = await this.carregar();

    if (termo && termo.trim()) {
      const t = termo.toLowerCase();

      veterinarios = veterinarios.filter(v =>
        v.nome.toLowerCase().includes(t) ||
        v.especialidade.toLowerCase().includes(t)
      );
    }

    return veterinarios;
  }

  async buscarPorId(id: number): Promise<Veterinario | undefined> {
    const veterinarios = await this.carregar();
    return veterinarios.find(v => v.id === id);
  }

  async criar(
    nome: string,
    crmv: string,
    especialidade: string,
    telefone: string
  ): Promise<Veterinario> {

    // Validar usando o método estático da classe
    const erros = Veterinario.validar({
      nome,
      crmv,
      especialidade,
      telefone
    });

    if (erros.length > 0) {
      throw new Error(erros.join(", "));
    }

    const veterinarios = await this.carregar();

    const ultimo = veterinarios.at(-1);
    const novoId = (ultimo?.id ?? 0) + 1;

    const novoVeterinario = new Veterinario(
      novoId,
      nome.trim(),
      crmv.trim(),
      especialidade.trim(),
      telefone.trim()
    );

    veterinarios.push(novoVeterinario);

    await this.salvar(veterinarios);

    return novoVeterinario;
  }

  async atualizar(
    id: number,
    dados: {
      nome?: string;
      crmv?: string;
      especialidade?: string;
      telefone?: string;
    }
  ): Promise<Veterinario | null> {

    const veterinarios = await this.carregar();

    const veterinario = veterinarios.find(v => v.id === id);

    if (!veterinario) return null;

    if (dados.nome) veterinario.nome = dados.nome;
    if (dados.crmv) veterinario.crmv = dados.crmv;
    if (dados.especialidade) veterinario.especialidade = dados.especialidade;
    if (dados.telefone) veterinario.telefone = dados.telefone;

    await this.salvar(veterinarios);

    return veterinario;
  }

  async remover(id: number): Promise<boolean> {

    const veterinarios = await this.carregar();

    const index = veterinarios.findIndex(v => v.id === id);

    if (index === -1) return false;

    veterinarios.splice(index, 1);

    await this.salvar(veterinarios);

    return true;
  }
}