// Classe Consulta com OOP: private, get/set, validacao, fromJSON/toJSON
export class Consulta {
    private _id: number;
    private _data: string;
    private _hora: string;
    private _motivo: string;
    private _status: string;
  
    constructor(
      id: number,
      data: string,
      hora: string,
      motivo: string,
      status: string
    ) {
      this._id = id;
      this._data = data;
      this._hora = hora;
      this._motivo = motivo;
      this._status = status;
    }
  
    // Getters
    get id(): number { return this._id; }
    get data(): string { return this._data; }
    get hora(): string { return this._hora; }
    get motivo(): string { return this._motivo; }
    get status(): string { return this._status; }
  
    // Setters com validacao
    set data(valor: string) {
      if (!valor || valor.trim() === "") throw new Error("Data obrigatória");
      this._data = valor.trim();
    }
  
    set hora(valor: string) {
      if (!valor || valor.trim() === "") throw new Error("Hora obrigatória");
      this._hora = valor.trim();
    }
  
    set motivo(valor: string) {
      if (!valor || valor.trim() === "") throw new Error("Motivo obrigatório");
      this._motivo = valor.trim();
    }
  
    set status(valor: string) {
      if (!valor || valor.trim() === "") throw new Error("Status obrigatório");
      this._status = valor.trim();
    }
  
    // Validação estática (antes de criar)
    static validar(dados: {
      data?: string;
      hora?: string;
      motivo?: string;
      status?: string;
    }): string[] {
      const erros: string[] = [];
  
      if (!dados.data || dados.data.trim() === "")
        erros.push("Data obrigatória");
  
      if (!dados.hora || dados.hora.trim() === "")
        erros.push("Hora obrigatória");
  
      if (!dados.motivo || dados.motivo.trim() === "")
        erros.push("Motivo obrigatório");
  
      if (!dados.status || dados.status.trim() === "")
        erros.push("Status obrigatório");
  
      return erros;
    }
  
    // Converter de JSON para instância da classe
    static fromJSON(json: any): Consulta {
      return new Consulta(
        json.id,
        json.data,
        json.hora,
        json.motivo,
        json.status
      );
    }
  
    // Converter da instância para JSON
    toJSON(): object {
      return {
        id: this._id,
        data: this._data,
        hora: this._hora,
        motivo: this._motivo,
        status: this._status
      };
    }
  }