let mail = document.getElementById('email');
let password = document.getElementById('password');

let errorMail = document.getElementById("login-error-mail")
let errorPassword = document.getElementById("login-error-password")

let errors = {
    mail: undefined,
    password: undefined,
};

mail.addEventListener('change', () => {
    let regularExpression = /\S+@\S+\.\S+/
    let valid = regularExpression.test(mail.value);
    console.log(valid)
    if(!valid){
        errors.push('Tienes que escribir un mail válido')
    }
})

password.addEventListener('focus', () => {
    if(password.value == ''){
        errors.password = 'Tienes que escribir una contraseña'
    }
    if(errors.password){
        errorPassword.innerHTML = errors.password;
    }
})
