let burger = document.querySelector('.burguer-menu')
let nav = document.querySelector('nav')

burger.addEventListener('click', () => {
   if(burger.classList.contains('desactive')) {
      burger.classList.add('rotate-back')
      setTimeout( _ => {
         burger.classList.remove('rotate-back')
      }, 751)
   }
   nav.classList.toggle('desactive')
   burger.classList.toggle('desactive')
})