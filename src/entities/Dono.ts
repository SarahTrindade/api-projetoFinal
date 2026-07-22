export class Dono {
    private _id: number;
    private _nome: string;
    private _telefone: string;
    private _email: string;
    private _endereco: string;

    constructor(
        id: number,
        nome: string,
        telefone: string,
        email: string,
        endereco: string
    ) {
        this._id = id;
        this._nome = nome;
        this._telefone = telefone;
        this._email = email;
        this._endereco = endereco;
    }

    // Getters
    get id(): number { return this._id; }
    get nome(): string { return this._nome; }
    get telefone(): string { return this._telefone; }
    get email(): string { return this._email; }
    get endereco(): string { return this._endereco; }

    // Setters com validação
    set nome(valor: string) {
        if (!valor || valor.trim() === "") {
            throw new Error("Nome obrigatório");
        }
        this._nome = valor.trim();
    }

    set telefone(valor: string) {
        if (!valor || valor.trim() === "") {
            throw new Error("Telefone obrigatório");
        }
        this._telefone = valor.trim();
    }

    set email(valor: string) {
        if (!valor || valor.trim() === "") {
            throw new Error("Email obrigatório");
        }
        this._email = valor.trim();
    }

    set endereco(valor: string) {
        if (!valor || valor.trim() === "") {
            throw new Error("Endereço obrigatório");
        }
        this._endereco = valor.trim();
    }

    // Validação estática (antes de criar)
    static validar(dados: {
        nome?: string;
        telefone?: string;
        email?: string;
        endereco?: string;
    }): string[] {

        const erros: string[] = [];

        if (!dados.nome || dados.nome.trim() === "") {
            erros.push("Nome obrigatório");
        }

        if (dados.nome && dados.nome.trim().length < 2) {
            erros.push("Nome deve possuir pelo menos 2 caracteres");
        }

        if (!dados.telefone || dados.telefone.trim() === "") {
            erros.push("Telefone obrigatório");
        }

        if (!dados.email || dados.email.trim() === "") {
            erros.push("Email obrigatório");
        }

        if (!dados.endereco || dados.endereco.trim() === "") {
            erros.push("Endereço obrigatório");
        }

        return erros;
    }

    // Converter do JSON para instância da classe
    static fromJSON(json: any): Dono {
        return new Dono(
            json.id,
            json.nome,
            json.telefone,
            json.email,
            json.endereco
        );
    }

    // Converter da instância para JSON
    toJSON(): object {
        return {
            id: this._id,
            nome: this._nome,
            telefone: this._telefone,
            email: this._email,
            endereco: this._endereco
        };
    }
}