// Repository: responsável por ler/gravar no JSON
// Usa a classe Consulta (fromJSON/toJSON)

import { readFile, writeFile } from "fs/promises";
import { Consulta } from "../entities/Consulta";

export class ConsultaRepository {
  private arquivo: string;

  constructor(arquivo: string = "dados/consultas.json") {
    this.arquivo = arquivo;
  }

  async carregar(): Promise<Consulta[]> {
    try {
      const texto = await readFile(this.arquivo, "utf-8");
      const dados = JSON.parse(texto);
      return dados.map((d: any) => Consulta.fromJSON(d));
    } catch {
      await this.salvar([]);
      return [];
    }
  }

  async salvar(consultas: Consulta[]): Promise<void> {
    const json = consultas.map(c => c.toJSON());
    await writeFile(this.arquivo, JSON.stringify(json, null, 2));
  }

  async listar(termo?: string): Promise<Consulta[]> {
    let consultas = await this.carregar();

    if (termo && termo.trim()) {
      const t = termo.toLowerCase();

      consultas = consultas.filter(c =>
        c.motivo.toLowerCase().includes(t) ||
        c.status.toLowerCase().includes(t)
      );
    }

    return consultas;
  }

  async buscarPorId(id: number): Promise<Consulta | undefined> {
    const consultas = await this.carregar();
    return consultas.find(c => c.id === id);
  }

  async criar(
    data: string,
    hora: string,
    motivo: string,
    status: string,
    idAnimal: number,
    idVeterinario: number
  ): Promise<Consulta> {

    // Validar usando o método estático da classe
    const erros = Consulta.validar({ data, hora, motivo });

    if (erros.length > 0) {
      throw new Error(erros.join(", "));
    }

    const consultas = await this.carregar();

    const ultimo = consultas.at(-1);
const novoId = (ultimo?.id ?? 0) + 1;

    const nova = new Consulta(
      novoId,
      data.trim(),
      hora.trim(),
      motivo.trim(),
      status.trim(),
      idAnimal,
      idVeterinario
    );

    consultas.push(nova);

    await this.salvar(consultas);

    return nova;
  }

  async atualizar(
    id: number,
    dados: {
      data?: string;
      hora?: string;
      motivo?: string;
      status?: string;
      idAnimal?: number;
      idVeterinario?: number;
    }
  ): Promise<Consulta | null> {

    const consultas = await this.carregar();

    const consulta = consultas.find(c => c.id === id);

    if (!consulta) return null;


    if (dados.data) consulta.data = dados.data;
    if (dados.hora) consulta.hora = dados.hora;
    if (dados.motivo) consulta.motivo = dados.motivo;
    if (dados.status) consulta.status = dados.status;

    if (dados.idAnimal !== undefined) {
      consulta.idAnimal = dados.idAnimal;
    }

    if (dados.idVeterinario !== undefined) {
      consulta.idVeterinario = dados.idVeterinario;
    }


    await this.salvar(consultas);

    return consulta;
  }

  async remover(id: number): Promise<boolean> {

    const consultas = await this.carregar();

    const index = consultas.findIndex(c => c.id === id);

    if (index === -1) return false;


    consultas.splice(index, 1);

    await this.salvar(consultas);

    return true;
  }
}