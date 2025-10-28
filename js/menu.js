document.addEventListener('DOMContentLoaded', () => {
    // ===== Hamburger Menu =====
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');

    if (hamburger && navbar) {
        const bars = hamburger.querySelectorAll('.bar');

        const toggleMenu = () => {
            navbar.classList.toggle('active');
            const isActive = navbar.classList.contains('active');

            bars[0].style.transform = isActive ? 'rotate(-45deg) translate(-5px, 6px)' : 'rotate(0) translate(0,0)';
            bars[1].style.opacity = isActive ? '0' : '1';
            bars[2].style.transform = isActive ? 'rotate(45deg) translate(-5px, -6px)' : 'rotate(0) translate(0,0)';
        };

        hamburger.addEventListener('click', toggleMenu);

        navbar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                bars[0].style.transform = 'rotate(0) translate(0,0)';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'rotate(0) translate(0,0)';
            });
        });
    }

    // ===== Scroll Animations =====
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll(
        '.hero_title, .tagline_box, .intro_container h1, .intro_container h4, ' +
        '.intro_text_blocks, .intro_list_blocks, .jp_table_container, ' +
        '.area2, .area3, .area4, .obj_header, .obj_group_1, .obj_group_2, .obj_group_3'
    ).forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.1}s`;
        observer.observe(el);
    });

    // ===== Smooth Scroll CTA =====
    const ctaButton = document.querySelector('.cta_button');
    const introSection = document.querySelector('.home_b');
    if (ctaButton && introSection) {
        ctaButton.addEventListener('click', e => {
            e.preventDefault();
            introSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // ===== Parallax Hero Video =====
    const heroVideo = document.querySelector('.hero_bg');
    if (heroVideo) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    if (scrollY < window.innerHeight) {
                        heroVideo.style.transform = `translateY(${scrollY * 0.5}px)`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // ===== Hover Effects =====
    const addHoverEffect = (selector, className) => {
        document.querySelectorAll(selector).forEach(el => {
            el.addEventListener('mouseenter', () => el.classList.add(className));
            el.addEventListener('mouseleave', () => el.classList.remove(className));
        });
    };

    addHoverEffect('.jp_tl_logo img, .jp_cl_logo img, .jp_bl_logo img', 'hover-scale');
    addHoverEffect('.content_image_row img', 'hover-pulse');
});
