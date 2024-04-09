document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        validateForm();
    });

    function validateForm() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (email.trim() === "" && password.trim() === "") {
            alert("Campos vazios! Por favor, preencha o campo de email e senha.");
        } else {
            if (!validateEmail(email)) {
                alert("Por favor, insira um email válido.");
            } else {
                if (password.trim() === "") {
                    alert("Por favor, preencha o campo de senha.");
                } else if (password.length > 8) {
                    alert("A senha deve ter no mínimo 8 caracteres.");
                } else {
                    // Se a validação passar, você pode enviar o formulário ou executar outras ações aqui
                    alert("Formulário válido. Enviando...");
                    // form.submit(); // Descomente esta linha para enviar o formulário
                }
            }
        }
    }

    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

});
