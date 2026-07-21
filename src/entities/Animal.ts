class Animal {
    // Atributos
    private nome: string;
    private especie: string;
    private idade: number;
    private peso: number;
  
    // Construtor
    constructor(nome: string, especie: string, idade: number, peso: number) {
      this.nome = nome;
      this.especie = especie;
      this.idade = idade;
      this.peso = peso;
    }
  
    // Métodos
    emitirSom(): void {
      console.log(`${this.nome} está emitindo um som.`);
    }
  
    comer(): void {
      console.log(`${this.nome} está comendo.`);
    }
  
    // Getters e Setters
    getNome(): string {
      return this.nome;
    }
  
    setNome(nome: string): void {
      this.nome = nome;
    }
  
    getEspecie(): string {
      return this.especie;
    }
  
    setEspecie(especie: string): void {
      this.especie = especie;
    }
  
    getIdade(): number {
      return this.idade;
    }
  
    setIdade(idade: number): void {
      this.idade = idade;
    }
  
    getPeso(): number {
      return this.peso;
    }
  
    setPeso(peso: number): void {
      this.peso = peso;
    }
  
    toString(): string {
      return `Animal { nome: ${this.nome}, espécie: ${this.especie}, idade: ${this.idade}, peso: ${this.peso}kg }`;
    }
  }
  