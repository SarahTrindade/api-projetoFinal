export class Usuario {
    private _id: number;
    private _nome: string;
    private _email: string;
    private _senha: string;

    constructor(
        id: number,
        nome: string,
        email: string,
        senha: string
    ) {
        this._id = id;
        this._nome = nome;
        this._email = email;
        this._senha = senha;
    }

    // Getters
    get id(): number { return this._id; }
    get nome(): string { return this._nome; }
    get email(): string { return this._email; }
    get senha(): string { return this._senha; }

    // Setters
    set nome(valor: string) {
        if (!valor || valor.trim() === "") {
            throw new Error("Nome obrigatório");
        }

        this._nome = valor.trim();
    }

    set email(valor: string) {
        if (!valor || valor.trim() === "") {
            throw new Error("E-mail obrigatório");
        }

        this._email = valor.trim().toLowerCase();
    }

    set senha(valor: string) {
        if (!valor || valor.length < 6) {
            throw new Error("Senha deve possuir pelo menos 6 caracteres");
        }

        this._senha = valor;
    }

    static validar(dados: {
        nome?: string;
        email?: string;
        senha?: string;
    }): string[] {

        const erros: string[] = [];

        if (!dados.nome || dados.nome.trim() === "") {
            erros.push("Nome obrigatório");
        }

        if (!dados.email || dados.email.trim() === "") {
            erros.push("E-mail obrigatório");
        }

        if (
            !dados.email?.includes("@")
        ) {
            erros.push("E-mail inválido");
        }

        if (!dados.senha || dados.senha.length < 6) {
            erros.push("Senha deve possuir pelo menos 6 caracteres");
        }

        return erros;
    }

    static fromJSON(json: any): Usuario {
        return new Usuario(
            json.id,
            json.nome,
            json.email,
            json.senha
        );
    }

    toJSON(): object {
        return {
            id: this._id,
            nome: this._nome,
            email: this._email,
            senha: this._senha
        };
    }
}