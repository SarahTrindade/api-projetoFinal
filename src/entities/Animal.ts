export class Animal {
    private _id: number;
    private _nome: string;
    private _especie: string;
    private _idade: number;
    private _peso: number;
    private _foto: string | null;

    constructor(
        id: number,
        nome: string,
        especie: string,
        idade: number,
        peso: number,
        foto: string | null = null
    ) {
        this._id = id;
        this._nome = nome;
        this._especie = especie;
        this._idade = idade;
        this._peso = peso;
        this._foto = foto;
    }

    // Getters
    get id(): number { return this._id; }
    get nome(): string { return this._nome; }
    get especie(): string { return this._especie; }
    get idade(): number { return this._idade; }
    get peso(): number { return this._peso; }
    get foto(): string | null { return this._foto; }

    // Setters com validação
    set nome(valor: string) {
        if (!valor || valor.trim() === "") {
            throw new Error("Nome obrigatório");
        }
        this._nome = valor.trim();
    }

    set especie(valor: string) {
        if (!valor || valor.trim() === "") {
            throw new Error("Espécie obrigatória");
        }
        this._especie = valor.trim();
    }

    set idade(valor: number) {
        if (valor < 0) {
            throw new Error("Idade inválida");
        }
        this._idade = valor;
    }

    set peso(valor: number) {
        if (valor <= 0) {
            throw new Error("Peso inválido");
        }
        this._peso = valor;
    }

    set foto(valor: string | null) {
        this._foto = valor;
    }

    // Validação estática (antes de criar)
    static validar(dados: {
        nome?: string;
        especie?: string;
        idade?: number;
        peso?: number;
    }): string[] {

        const erros: string[] = [];

        if (!dados.nome || dados.nome.trim() === "") {
            erros.push("Nome obrigatório");
        }

        if (dados.nome && dados.nome.trim().length < 2) {
            erros.push("Nome deve possuir pelo menos 2 caracteres");
        }

        if (!dados.especie || dados.especie.trim() === "") {
            erros.push("Espécie obrigatória");
        }

        if (dados.idade === undefined || dados.idade < 0) {
            erros.push("Idade inválida");
        }

        if (dados.peso === undefined || dados.peso <= 0) {
            erros.push("Peso inválido");
        }

        return erros;
    }

    // Converter do JSON para instância da classe
    static fromJSON(json: any): Animal {
        return new Animal(
            json.id,
            json.nome,
            json.especie,
            json.idade,
            json.peso,
            json.foto || null
        );
    }

    // Converter da instância para JSON
    toJSON(): object {
        return {
            id: this._id,
            nome: this._nome,
            especie: this._especie,
            idade: this._idade,
            peso: this._peso,
            foto: this._foto
        };
    }
}