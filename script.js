document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggler ---
    const themeToggleButton = document.getElementById('theme-toggle');
    if (themeToggleButton) {
        const preferDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme');

        let currentTheme;
        if (savedTheme) {
            currentTheme = savedTheme;
        } else {
            currentTheme = preferDark ? 'dark' : 'light';
        }

        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);

        themeToggleButton.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // --- Gallery Lightbox ---
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lightboxContent = document.querySelector('.lightbox-content');
        const galleryItems = document.querySelectorAll('.gallery-item');
        const closeButton = document.querySelector('.lightbox-close');

        galleryItems.forEach(item => {
            item.addEventListener('click', e => {
                e.preventDefault();
                const imageUrl = item.getAttribute('data-src');
                lightboxContent.setAttribute('src', imageUrl);
                lightbox.classList.add('show');
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('show');
            // Delay clearing src to prevent image flash on close
            setTimeout(() => {
                lightboxContent.setAttribute('src', '');
            }, 250);
        };

        closeButton.addEventListener('click', closeLightbox);
        // Also close lightbox when clicking on the background
        lightbox.addEventListener('click', e => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
});
