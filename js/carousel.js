document.addEventListener('DOMContentLoaded', function() {
    const carouselSlide = document.querySelector('.carousel-slide');
    const carousel = document.querySelector('.carousel');
    const images = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let counter = 0;

    function updateCarousel() {
        const size = carousel.clientWidth; // recalculate on resize
        carouselSlide.style.transition = 'transform 0.5s ease-in-out';
        carouselSlide.style.transform = `translateX(${-size * counter}px)`;
    }

    // Initialize
    updateCarousel();

    // Button listeners
    nextBtn.addEventListener('click', () => {
        if (counter >= images.length - 1) return;
        counter++;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        if (counter <= 0) return;
        counter--;
        updateCarousel();
    });

    // Adjust when window resizes
    window.addEventListener('resize', updateCarousel);
});
