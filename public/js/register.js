let form = document.getElementById('register-form')
let name = document.getElementById('register-name');
let lastName = document.getElementById('register-last-name');
let mail = document.getElementById('register-mail');
let password = document.getElementById('register-password');
let file = document.getElementById('register-file');

let errorName = document.getElementById('register-error-name');
let errorLastName = document.getElementById('register-error-last-name');
let errorMail = document.getElementById('register-error-mail');
let errorPassword = document.getElementById('register-error-password');
let errorFile = document.getElementById('register-error-file')

let errors = {
    name: true,
    lastName: true,
    file: false,
    mail: true,
    password: true,
    checkPassword: true,
}

name.addEventListener('change', () => {
    if (name.value.length < 2) {
        errors.name = true;
    } else {
        errors.name = false
    }

    if (errors.name) {
        errorName.innerHTML = 'Obligatorio (2 caracteres mínimo)'
        errorName.style.display = 'block'
    } else {
        errorName.style.display = 'none'
    }
});

lastName.addEventListener('change', () => {
    if (lastName.value.length < 2) {
        errors.lastName = true;
    } else {
        errors.lastName = false
    }

    if (errors.lastName) {
        errorLastName.innerHTML = 'Obligatorio (2 caracteres mínimo)'
        errorLastName.style.display = 'block'
    } else {
        errorLastName.style.display = 'none'
    }
});

mail.addEventListener('change', () => {
    let regularExpression = /\S+@\S+\.\S+/
    let valid = regularExpression.test(mail.value);
    if (!valid) {
        errors.mail = true
    } else {
        errors.mail = false
    }

    if (errors.mail) {
        errorMail.innerHTML = 'Debes introducir un mail válido'
        errorMail.style.display = 'block'
    } else {
        errorMail.style.display = 'none'
    }
});

password.addEventListener('change', () => {
    let regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    let valid = regex.test(password.value);
    if (!valid) {
        errors.password = true;
    } else {
        errors.password = false
    }

    if (errors.lastName) {
        errorPassword.innerHTML = 'Obligatorio: 8 caracteres, 1 mayúscula, 1 minúscula y un caracter especial (@$!%*#?&)'
        errorPassword.style.display = 'block'
    } else {
        errorPassword.style.display = 'none'
    }
});

file.addEventListener('change', () => {
    if (!(file.value.includes('.jpg') || file.value.includes('.jpeg') || file.value.includes('.png'))) {
        errors.file = true
        errorFile.innerHTML = 'Tienes que subir una imagen en formato .jpg, .jpeg, .png' // le tenemos miedo a los gifs
        errorFile.style.display = 'block'
    } else {
        errors.file = false;
        errorFile.style.display = 'none'
    }
})


form.addEventListener('submit', (e) => {
    if (Object.values(errors).includes(true)) {
        e.preventDefault()
    }
})