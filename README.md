# API Clínica Veterinária

## Descrição

Este projeto é uma API desenvolvida em Node.js com TypeScript para gerenciamento de uma clínica veterinária.

A aplicação permite o cadastro e gerenciamento de animais, donos, veterinários, consultas e usuários, além de possuir autenticação com login e logout.

---

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- EJS
- Express Session
- JSON
- CSS

---

## Instalação

1. Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
```

2. Entre na pasta do projeto:

```bash
cd nome-do-projeto
```

3. Instale as dependências:

```bash
npm install
```

---

## Como executar

Inicie o servidor com:

```bash
npm run dev
```

Caso utilize outro script:

```bash
npm start
```

---

## Rotas Principais

### Autenticação

- POST /api/auth/cadastro
- POST /api/auth/login
- POST /api/auth/logout

### Animais

- GET /api/animais
- POST /api/animais
- PUT /api/animais/:id
- DELETE /api/animais/:id

### Consultas

- GET /api/consultas
- POST /api/consultas
- PUT /api/consultas/:id
- DELETE /api/consultas/:id

### Donos

- GET /api/donos
- POST /api/donos
- PUT /api/donos/:id
- DELETE /api/donos/:id

### Veterinários

- GET /api/veterinarios
- POST /api/veterinarios
- PUT /api/veterinarios/:id
- DELETE /api/veterinarios/:id

---

## Autores

Eduarda Lorrany, Igon César. Melissa Rodrigues, Sarah Trindade e Sofia Lara