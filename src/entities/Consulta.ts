// Classe Consulta com OOP: private, get/set, validacao, fromJSON/toJSON
export class Consulta {
  private _id: number;
  private _data: string;
  private _hora: string;
  private _motivo: string;
  private _status: string;
  private _idAnimal: number;
  private _idVeterinario: number;

  constructor(
    id: number,
    data: string,
    hora: string,
    motivo: string,
    status: string,
    idAnimal: number,
    idVeterinario: number
  ) {
    this._id = id;
    this._data = data;
    this._hora = hora;
    this._motivo = motivo;
    this._status = status;
    this._idAnimal = idAnimal;
    this._idVeterinario = idVeterinario;
  }

  // Getters
  get id(): number {
    return this._id;
  }

  get data(): string {
    return this._data;
  }

  get hora(): string {
    return this._hora;
  }

  get motivo(): string {
    return this._motivo;
  }

  get status(): string {
    return this._status;
  }

  get idAnimal(): number {
    return this._idAnimal;
  }

  get idVeterinario(): number {
    return this._idVeterinario;
  }

  // Setters com validação
  set data(valor: string) {
    if (!valor || valor.trim() === "") {
      throw new Error("Data obrigatória");
    }
    this._data = valor.trim();
  }

  set hora(valor: string) {
    if (!valor || valor.trim() === "") {
      throw new Error("Hora obrigatória");
    }
    this._hora = valor.trim();
  }

  set motivo(valor: string) {
    if (!valor || valor.trim() === "") {
      throw new Error("Motivo obrigatório");
    }
    this._motivo = valor.trim();
  }

  set status(valor: string) {
    if (!valor || valor.trim() === "") {
      throw new Error("Status obrigatório");
    }
    this._status = valor.trim();
  }

  set idAnimal(valor: number) {
    if (valor <= 0) {
      throw new Error("Id do animal inválido");
    }
    this._idAnimal = valor;
  }

  set idVeterinario(valor: number) {
    if (valor <= 0) {
      throw new Error("Id do veterinário inválido");
    }
    this._idVeterinario = valor;
  }

  // Validação estática
  static validar(dados: {
    data?: string;
    hora?: string;
    motivo?: string;
    status?: string;
    idAnimal?: number;
    idVeterinario?: number;
  }): string[] {
    const erros: string[] = [];

    if (!dados.data || dados.data.trim() === "") {
      erros.push("Data obrigatória");
    }

    if (!dados.hora || dados.hora.trim() === "") {
      erros.push("Hora obrigatória");
    }

    if (!dados.motivo || dados.motivo.trim() === "") {
      erros.push("Motivo obrigatório");
    }

    if (!dados.status || dados.status.trim() === "") {
      erros.push("Status obrigatório");
    }

    if (
      dados.idAnimal !== undefined &&
      dados.idAnimal <= 0
    ) {
      erros.push("Animal inválido");
    }

    if (
      dados.idVeterinario !== undefined &&
      dados.idVeterinario <= 0
    ) {
      erros.push("Veterinário inválido");
    }

    return erros;
  }

  // Converter JSON para objeto
  static fromJSON(json: any): Consulta {
    return new Consulta(
      json.id,
      json.data,
      json.hora,
      json.motivo,
      json.status,
      json.idAnimal,
      json.idVeterinario
    );
  }

  // Converter objeto para JSON
  toJSON(): object {
    return {
      id: this._id,
      data: this._data,
      hora: this._hora,
      motivo: this._motivo,
      status: this._status,
      idAnimal: this._idAnimal,
      idVeterinario: this._idVeterinario
    };
  }
}