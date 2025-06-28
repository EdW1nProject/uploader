// Inisialisasi AOS.js
AOS.init({
    duration: 800, // Durasi animasi
    easing: 'ease-in-out', // Jenis easing
});

// Smooth scroll untuk navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
