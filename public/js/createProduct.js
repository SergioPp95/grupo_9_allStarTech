let form = document.getElementById('product-create-form')
let name = document.getElementById('product-create-name')
let price = document.getElementById('product-create-price')
let discount = document.getElementById('product-create-discount')
let file = document.getElementById('product-create-file')
let file2 = document.getElementById('product-create-file2')
let description = document.getElementById('product-create-description')


let errorName = document.getElementById('product-create-error-name');
let errorPrice = document.getElementById('product-create-error-price');
let errorDiscount = document.getElementById('product-create-error-discount')
let errorFile = document.getElementById('product-create-error-file')
let errorFile2 = document.getElementById('product-create-error-file2')
let errorDescription = document.getElementById('product-create-error-description')

let errors = {
    name: true,
    price: true,
    discount: false,
    file: false,
    file2: false,
    description: true,
}

name.addEventListener('change', () => {
    if (name.value.length < 5) {
        errors.name = true;
    } else {
        errors.name = false
    }

    if (errors.name) {
        errorName.innerHTML = 'Obligatorio (5 caracteres mínimo)'
        errorName.style.display = 'block'
    } else {
        errorName.style.display = 'none'
    }
})

price.addEventListener('change', () => {
    const regex = /^\d+$/
    let valid = regex.test(price.value)

    if (!valid) {
        errors.price = true;
    } else {
        errors.price = false
    }
    
    if (errors.price) {
        errorPrice.innerHTML = 'Obligatorio (solo valores numéricos)'
        errorPrice.style.display = 'block'
    } else {
        errorPrice.style.display = 'none'
    }
})

discount.addEventListener('change', () => {
    const regex = /^(100||[\d]{1,2})$/
    let valid = regex.test(discount.value)

    if (!valid) {
        errors.discount = true;
    } else {
        errors.discount = false
    }

    if (errors.discount) {
        errorDiscount.innerHTML = 'Obligatorio (solo valores numéricos entre 0 y 100'
        errorDiscount.style.display = 'block'
    } else {
        errorDiscount.style.display = 'none'
    }
})

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

file2.addEventListener('change', () => {
    if (!(file2.value.includes('.jpg') || file2.value.includes('.jpeg') || file2.value.includes('.png'))) {
        errors.file2 = true
        errorFile2.innerHTML = 'Tienes que subir una imagen en formato .jpg, .jpeg, .png' // le tenemos miedo a los gifs
        errorFile2.style.display = 'block'
    } else {
        errors.file2 = false;
        errorFile2.style.display = 'none'
    }
})

description.addEventListener('change', () => {
    if (description.value.length < 20) {
        errors.description = true
    } else {
        errors.description = false
    }

    if (errors.description) {
        errorDescription.innerHTML = 'Obligatorio (20 caracteres mínimo)'
        errorDescription.style.display = 'block'
    } else {
        errorDescription.style.display = 'none'
    }
})

form.addEventListener('submit', (e) => {
    if (Object.values(errors).includes(true)) {
        e.preventDefault()
     
        if (errors.name) {
            errorName.innerHTML = 'Obligatorio (5 caracteres mínimo)'
            errorName.style.display = 'block'
        } else {
            errorName.style.display = 'none'
        }

        if (errors.price) {
            errorPrice.innerHTML = 'Obligatorio'
            errorPrice.style.display = 'block'
        } else {
            errorPrice.style.display = 'none'
        }

        if (errors.description) {
            errorDescription.innerHTML = 'Obligatorio (20 caracteres mínimo)'
            errorDescription.style.display = 'block'
        } else {
            errorDescription.style.display = 'none'
        }
    }
})