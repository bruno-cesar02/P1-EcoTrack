//Este script vai monitorar os inputs e ativar a animação das labels quando o usuário digitar ou focar no campo.
document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll(".input-group input");

    inputs.forEach((input) => {
        const label = input.previousElementSibling;

        input.addEventListener("focus", () => {
            label.classList.add("ativo");
        });

        input.addEventListener("blur", () => {
            if (input.value === "") {
                label.classList.remove("ativo");
            }
        });
    });
});

//manda pra tela de dashboard quando a pessoa clica no botao "Entrar"//
const form = document.getElementById("cadastroForm");

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const nome = document.getElementById("nome").value;
            const email = document.getElementById("email").value;
            const senha = document.getElementById("senha").value;
            const confirmsenha = document.getElementById("confirmar-senha").value;

            if (nome && email && senha && confirmsenha) {
                if (senha === confirmsenha) {
                    // Redireciona para a página de dashboard
                    window.location.href = "dashboard.html";
                } else {
                    alert("As senhas não coincidem!");
                }
            } else {
                alert("Preencha todos os campos!");
            }
        });