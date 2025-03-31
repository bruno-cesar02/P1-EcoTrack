
//faz a animacao nos inputs
document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll(".input-group input");

    inputs.forEach(input => {
        input.addEventListener("focus", function () {
            this.previousElementSibling.classList.add("ativo");
        });

        input.addEventListener("blur", function () {
            if (this.value === "") {
                this.previousElementSibling.classList.remove("ativo");
            }
        });
    });
});


//manda pra tela de dashboard quando a pessoa clica no botao "Entrar"//
const form = document.getElementById("loginForm");

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const senha = document.getElementById("senha").value;

            if (email && senha) {
                window.location.href = "dashboard.html";
            } else {
                alert("Preencha todos os campos!");
            }
        });
