document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        validateForm();
    });

    async function validateForm() {
        const name = document.getElementById("name").value;
        let cpf = document.getElementById("cpf").value.replace(/[^\d]/g, ''); // Remove caracteres não numéricos
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("validPassword").value;


        if (!validateFullName(name)) {
            alert("Por favor, preencha com seu nome completo.");
            return;
        }

        
        const isValidCPF = await validateCPFWithAPI(cpf);

            if (!isValidCPF) {
                alert("CPF inválido. Por favor, insira um CPF válido.");
                return;
            }
    

        if (!validateCPF(cpf)) {
            alert("Por favor, insira um CPF válido.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Valido");
            return;
        }
        else {
            alert("CPF inválido");
        }
        

        if (!validatePhoneNumber(phone)) {
            alert("Por favor, insira um número de celular válido com DDD.");
            return;
        }

        if (password.trim() === "") {
            alert("Por favor, preencha o campo de senha.");
            return;
        } else if (password.length > 8) {
            alert("A senha deve ter no mínimo 8 caracteres.");
            return;
        }

        if (password === confirmPassword) {
            alert("Senhas estão em conformidade");
        } else {
            alert("As senhas não estão em conformidade");
        }
    }

    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    function validateCPF(cpf) {
        const cpfNumbers = cpf.slice(0, -2).split("").map(Number);
        const verifierDigits = cpf.slice(-2).split("").map(Number);

        const calculateDigit = (cpfPart) => {
            let sum = 0;
            for (let i = 0; i < cpfPart.length; i++) {
                sum += cpfPart[i] * (cpfPart.length + 1 - i);
            }
            const remainder = sum % 11;
            return remainder < 2 ? 0 : 11 - remainder;
        };

        const firstDigit = calculateDigit(cpfNumbers);
        cpfNumbers.push(firstDigit);
        const secondDigit = calculateDigit(cpfNumbers);
        cpfNumbers.push(secondDigit);

        return verifierDigits[0] === firstDigit && verifierDigits[1] === secondDigit;
    }

    function validatePhoneNumber(phone) {
        // Formato esperado: DDD9XXXXXXXX (11 dígitos)
        const phoneRegex = /^\d{2}9\d{8}$/;
        return phoneRegex.test(phone);
    }

    function validateFullName(fullName) {
        return fullName.trim().split(" ").length > 2;
    }

    async function validateCPFWithAPI(cpf) {
        const apiUrl = `https://api.consultacpf.com/check/${cpf}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            
            // A API pode retornar informações adicionais, mas neste exemplo, apenas verificamos se o CPF é válido.
            return data.status === "VALIDO";
        } catch (error) {
            console.error("Erro ao validar CPF:", error);
            return false;
        }
    }

    function normalizeString(str) {
        // Normalizar a string removendo espaços e convertendo para minúsculas
        return str.replace(/\s/g, '').toLowerCase();
    }

});
