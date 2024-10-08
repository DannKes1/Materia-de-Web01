$(document).ready(function () {


    $('#meuFormulario').on('submit', function (event) {
        event.preventDefault();

        // resetar a mensagem de erro
        $('.form-control').removeClass('is-invalid');


        let isValid = true;


        // validacao do nome apenas letras e espacos)
        const nome = $('#nome').val().trim();

        if (!/^[a-zA-Z\s]+$/.test(nome)) {
            $('#nome').addClass('is-invalid');
            isValid = false;
        }

        //validacao do email 
        const email = $('#email').val().trim();

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            $('#email').addClass('is-invalid');
            isValid = false;

        }


        // Validação da senha (mínimo 8 caracteres, incluindo letras e números)
        const senha = $('#senha').val();
        if (senha.length < 8 || !/[a-zA-Z]/.test(senha) || !/[0-9]/.test(senha)) {
            $('#senha').addClass('is-invalid');
            isValid = false;
        }

        // Validação do telefone (formato (XX) XXXXX-XXXX)
        const telefone = $('#telefone').val().trim();
        if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(telefone)) {
            $('#telefone').addClass('is-invalid');
            isValid = false;
        }

        // Validação do CPF (formato XXX.XXX.XXX-XX)
        const cpf = $('#cpf').val().trim();
        if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
            $('#cpf').addClass('is-invalid');
            isValid = false;
        }

        // se tudo da certo

        if(!isValid) return 
        this.submit();

    })









})





















