// ==========================================
// 1. ПЛАВНАЯ ПРОКРУТКА ДЛЯ ССЫЛОК-ЯКОРЕЙ
// ==========================================
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Пропускаем обычные ссылки на другие страницы (например, index_ee.html)
        if (!targetId || !targetId.startsWith('#')) return; 

        // Если это просто клик по наверх или логотипу "#"
        if (targetId === '#') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });

            // Закрываем меню при переходе по якорной ссылке
            const burger = document.getElementById('burgerToggle');
            const navMenu = document.getElementById('navMenu');
            if (burger && navMenu) {
                burger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
});

// ==========================================
// 2. МОБИЛЬНОЕ МЕНЮ БУРГЕР
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burgerToggle');
    const navMenu = document.getElementById('navMenu');

    if (burger && navMenu) {
        // Открытие / закрытие по клику на гамбургер
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Закрытие меню при клике на любой пункт внутри
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});
