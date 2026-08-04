const form = document.getElementById("formCadastro");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dados = new FormData(form);

    try {
        const resposta = await fetch("/api/animais", {
            method: "POST",
            body: dados
        });

        const resultado = await resposta.json();

        if (resposta.ok) {
            alert(resultado.mensagem);
            form.reset();
        } else {
            alert(resultado.mensagem);
        }

    } catch (erro) {
        alert("Erro ao cadastrar animal.");
    }
});