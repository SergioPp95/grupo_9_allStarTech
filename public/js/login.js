let mail = document.getElementById('email');
let password = document.getElementById('password');
let form = document.getElementById('login-form');

let errorMail = document.getElementById("login-error-mail")
let errorPassword = document.getElementById("login-error-password")

let errors = {
    mail: true,
    password: true,
};

mail.addEventListener('change', () => {
    let regularExpression = /\S+@\S+\.\S+/
    let valid = regularExpression.test(mail.value);
    if(!valid){
        errors.mail = true
    } else {
        errors.mail = false
    }
    
    if(errors.mail){
        errorMail.style.display = 'block'
    } else {
        errorMail.style.display = 'none'
    }

})

password.addEventListener('change', () => {
    if(password.value == ''){
        errors.password = true
    } else {
        errors.password = false
    }
    if(errors.password){
        errorPassword.style.display = 'block'
    } else {
        errorPassword.style.display = 'none'
    }
})

form.addEventListener('submit', (e) => {
    if(Object.values(errors).includes(true)){
        e.preventDefault()
    }
})