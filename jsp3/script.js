const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const repassword = document.getElementById('repassword');
const phone = document.getElementById('phone');

function error(input, message) {
    input.className = 'form-control is-invalid';
    const div = input.nextElementSibling;
    div.innerText = message;
    div.className = 'invalid-feedback';
}

function succes(input) {
    input.className = 'form-control is-valid';
}

function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(input.value)) {
        succes(input);
    } else {
        error(input, 'Incorrect e-mail');
    }
}

function chekRequired(inputs) {
    inputs.forEach(function (input) {
        if (input.value === '') {
            error(input, `Please enter ${input.id}`);
        } else {
            succes(input);
        }
    });
}

function checkPassworLength(input, min, max) {
    if (input.value.length < min) {
        error(input, `${input.id} need ${min} character`)
    } else if (input.value.length > max) {
        error(input, `${input.id} need ${max} character`)
    } else {
        succes(input);
    }
}

function checkPasswords(i1, i2) {
    if (i1.value !== i2.value) {
        error(i2, 'Passwords is not true')
    }
}

function checkPhoneNumber(input) {
    let exp = /^\d{10}$/;
    if (!exp.test(input.value)) {
        error(input, 'Phone number will be 10 character');
    }
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    chekRequired([username, email, password, repassword, phone]);
    checkEmail(email);
    checkPassworLength(password, 8, 40);
    checkPasswords(password, repassword);
    checkPhoneNumber(phone);

});