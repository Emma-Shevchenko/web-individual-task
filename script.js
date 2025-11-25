document.addEventListener('DOMContentLoaded', function () {

    // Бургер-меню
    const burger = document.getElementById('burger');
    const navMenu = document.querySelector('.nav-menu');

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Закриваємо меню при кліку на посилання
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Анімація лічильників на головній
    const counters = document.querySelectorAll('.stat-number');
    const speed = 2000;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(animateCounters, 20);
            } else {
                counter.innerText = target + (counter.innerText.includes('+') ? '+' : '');
            }
        });
    };

    const counterSection = document.querySelector('.hero-stats');
    if (counterSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.unobserve(counterSection);
            }
        }, { threshold: 0.5 });
        observer.observe(counterSection);
    }

    // Модальне вікно запису
    const modal = document.getElementById('bookingModal');
    const openBtns = document.querySelectorAll('#bookingBtn, #heroBooking, #ctaBooking, .btn-primary[onclick="openModal()"]');
    const closeBtn = document.getElementById('modalClose');

    openBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('#bookingForm, #contactForm').forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Дякуємо! Ваша заявка прийнята. Ми зв’яжемося з вами найближчим часом ❤️');
            closeModal();
            form.reset();
        });
    });

    // FAQ
    document.querySelectorAll('.faq-question').forEach(item => {
        item.addEventListener('click', () => {
            const parent = item.parentElement;
            parent.classList.toggle('active');
        });
    });

});