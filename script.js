document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const toggleIcon = themeToggle.querySelector('.toggle-icon');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        body.classList.toggle('light-theme');
        toggleIcon.textContent = body.classList.contains('dark-theme') ? '🌙' : '☀️';
    });

    // Category Filtering
    const navButtons = document.querySelectorAll('.nav-button');
    const hexagons = document.querySelectorAll('.hexagon');
    let intervals = [];

    // Initialize with "All" category
    filterImages('all');
    startSlideshow();

    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const category = button.getAttribute('data-category');

            // Remove active class from all buttons
            navButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            // Stop existing slideshows
            intervals.forEach(interval => clearInterval(interval));
            intervals = [];

            // Filter images based on category
            filterImages(category);

            // Restart slideshow
            startSlideshow();
        });
    });

    function filterImages(category) {
        hexagons.forEach(hexagon => {
            const slides = hexagon.querySelectorAll('.slide');
            slides.forEach(slide => {
                slide.classList.remove('active');
                if (category === 'all' || slide.getAttribute('data-category') === category) {
                    slide.style.display = 'block';
                } else {
                    slide.style.display = 'none';
                }
            });

            // Set the first matching slide as active
            const visibleSlides = Array.from(slides).filter(slide => slide.style.display === 'block');
            if (visibleSlides.length > 0) {
                visibleSlides[0].classList.add('active');
            }
        });
    }

    function startSlideshow() {
        hexagons.forEach(hexagon => {
            const frame = hexagon.querySelector('.hexagon-frame');
            let currentIndex = 0;

            const changeSlide = () => {
                const slides = Array.from(hexagon.querySelectorAll('.slide')).filter(slide => slide.style.display === 'block');
                if (slides.length === 0) return;

                slides[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % slides.length;
                slides[currentIndex].classList.add('active');

                // Trigger shine animation
                frame.classList.remove('shine');
                void frame.offsetWidth; // Reset animation
                frame.classList.add('shine');
            };

            // Start slideshow for each hexagon
            intervals.push(setInterval(changeSlide, 3000)); // Change slide every 3 seconds
        });
    }

    // Button Shine Animation on Hover
    const buttons = document.querySelectorAll('.nav-button');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.classList.remove('shine');
            void button.offsetWidth; // Reset animation
            button.classList.add('shine');
        });
    });

   
   // Video Slideshow
const videoCards = document.querySelectorAll('.video-card');

videoCards.forEach(card => {
    const videos = card.querySelectorAll('.video-slide');
    let currentIndex = 0;

    const changeVideo = () => {
        videos[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % videos.length;
        videos[currentIndex].classList.add('active');

        // For YouTube videos, reload the iframe to restart the video
        if (videos[currentIndex].src.includes('youtube')) {
            videos[currentIndex].src = videos[currentIndex].src;
        }
    };

    // Start video slideshow for each card
    setInterval(changeVideo, 5000); // Change video every 5 seconds
});
});