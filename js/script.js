const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.navbar');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});
