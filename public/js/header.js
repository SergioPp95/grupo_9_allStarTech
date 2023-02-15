let burger = document.querySelector('.burguer-menu')
let nav = document.querySelector('nav')

burger.addEventListener('click', () => {
   if(nav.style.display != 'none'){
      nav.style.display = 'none'
   } else {
      nav.style.display = 'flex'
   }
})