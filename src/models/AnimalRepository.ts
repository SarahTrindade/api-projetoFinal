import { readFile, writeFile } from "fs/promises";
import { Animal } from "../entities/Animal";

export class AnimalRepository {
  private arquivo: string;

  constructor(arquivo: string = "dados/animais.json") {
    this.arquivo = arquivo;
  }

  async carregar(): Promise<Animal[]> {
    try {
      const texto = await readFile(this.arquivo, "utf-8");
      const dados = JSON.parse(texto);
      return dados.map((d: any) => Animal.fromJSON(d));
    } catch {
      await this.salvar([]);
      return [];
    }
  }

  async salvar(animais: Animal[]): Promise<void> {
    const json = animais.map(a => a.toJSON());
    await writeFile(this.arquivo, JSON.stringify(json, null, 2));
  }

  async listar(termo?: string): Promise<Animal[]> {
    let animais = await this.carregar();

    if (termo && termo.trim()) {
      const t = termo.toLowerCase();

      animais = animais.filter(a =>
        a.nome.toLowerCase().includes(t) ||
        a.especie.toLowerCase().includes(t)
      );
    }

    return animais;
  }

  async buscarPorId(id: number): Promise<Animal | undefined> {
    const animais = await this.carregar();
    return animais.find(a => a.id === id);
  }

  async criar(
    nome: string,
    especie: string,
    idade: number,
    peso: number
  ): Promise<Animal> {

    const erros = Animal.validar({
      nome,
      especie,
      idade,
      peso
    });

    if (erros.length > 0) {
      throw new Error(erros.join(", "));
    }

    const animais = await this.carregar();

    const ultimo = animais.at(-1);
    const novoId = (ultimo?.id ?? 0) + 1;

    const novoAnimal = new Animal(
      novoId,
      nome.trim(),
      especie.trim(),
      idade,
      peso
    );

    animais.push(novoAnimal);

    await this.salvar(animais);

    return novoAnimal;
  }

  async atualizar(
    id: number,
    dados: {
      nome?: string;
      especie?: string;
      idade?: number;
      peso?: number;
    }
  ): Promise<Animal | null> {

    const animais = await this.carregar();

    const animal = animais.find(a => a.id === id);

    if (!animal) return null;

    if (dados.nome) animal.nome = dados.nome;
    if (dados.especie) animal.especie = dados.especie;

    if (dados.idade !== undefined) {
      animal.idade = dados.idade;
    }

    if (dados.peso !== undefined) {
      animal.peso = dados.peso;
    }

    await this.salvar(animais);

    return animal;
  }

  async remover(id: number): Promise<boolean> {

    const animais = await this.carregar();

    const index = animais.findIndex(a => a.id === id);

    if (index === -1) return false;

    animais.splice(index, 1);

    await this.salvar(animais);

    return true;
  }
}

