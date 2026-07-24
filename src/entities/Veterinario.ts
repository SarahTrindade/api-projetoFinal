// Classe Veterinario com OOP: private, get/set, validacao, fromJSON/toJSON
export class Veterinario {
    private _id: number;
    private _nome: string;
    private _crmv: string;
    private _especialidade: string;
    private _telefone: string;
  
    constructor(
      id: number,
      nome: string,
      crmv: string,
      especialidade: string,
      telefone: string
    ) {
      this._id = id;
      this._nome = nome;
      this._crmv = crmv;
      this._especialidade = especialidade;
      this._telefone = telefone;
    }
  
    // Getters
    get id(): number { return this._id; }
    get nome(): string { return this._nome; }
    get crmv(): string { return this._crmv; }
    get especialidade(): string { return this._especialidade; }
    get telefone(): string { return this._telefone; }
  
    // Setters com validação
    set nome(valor: string) {
      if (!valor || valor.trim() === "")
        throw new Error("Nome obrigatório");
      this._nome = valor.trim();
    }
  
    set crmv(valor: string) {
      if (!valor || valor.trim() === "")
        throw new Error("CRMV obrigatório");
      this._crmv = valor.trim();
    }
  
    set especialidade(valor: string) {
      if (!valor || valor.trim() === "")
        throw new Error("Especialidade obrigatória");
      this._especialidade = valor.trim();
    }
  
    set telefone(valor: string) {
      if (!valor || valor.trim() === "")
        throw new Error("Telefone obrigatório");
      this._telefone = valor.trim();
    }
  
    // Validação estática (antes de criar)
    static validar(dados: {
      nome?: string;
      crmv?: string;
      especialidade?: string;
      telefone?: string;
    }): string[] {
      const erros: string[] = [];
  
      if (!dados.nome || dados.nome.trim() === "")
        erros.push("Nome obrigatório");
  
      if (!dados.crmv || dados.crmv.trim() === "")
        erros.push("CRMV obrigatório");
  
      if (!dados.especialidade || dados.especialidade.trim() === "")
        erros.push("Especialidade obrigatória");
  
      if (!dados.telefone || dados.telefone.trim() === "")
        erros.push("Telefone obrigatório");
  
      return erros;
    }
  
    // Converter de JSON para instância da classe
    static fromJSON(json: any): Veterinario {
      return new Veterinario(
        json.id,
        json.nome,
        json.crmv,
        json.especialidade,
        json.telefone
      );
    }
  
    // Converter da instância para JSON
    toJSON(): object {
      return {
        id: this._id,
        nome: this._nome,
        crmv: this._crmv,
        especialidade: this._especialidade,
        telefone: this._telefone
      };
    }
  }