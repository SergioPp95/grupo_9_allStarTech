let burger = document.querySelector('.burguer-menu')
let nav = document.querySelector('nav')

burger.addEventListener('click', () => {
    if(nav.style.display != 'flex'){
        nav.style.display = 'flex'
    } else {
        nav.style.display = 'none'
    }
})