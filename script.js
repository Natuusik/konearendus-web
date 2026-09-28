
  ==========================================
// 1. ПЛАВНАЯ ПРОКРУТКА ДЛЯ ССЫЛОК-ЯКОРЕЙ + ЗАКРЫТИЕ МЕНЮ
// ==========================================
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Пропускаем ссылки, если это не якорные ссылки (например, index_ee.html)
        if (!targetId || !targetId.startsWith('#')) return; 

        // Игнорируем клик по одиночному символу "#" (чтобы не падал JS)
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

            // Автоматически закрываем мобильное меню при клике на любую ссылку
            const burger = document.getElementById('burgerToggle');
            const navMenu = document.getElementById('navMenu');
            if (burger && navMenu) {
                burger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
});
  //==========================================
// 2. МОБИЛЬНОЕ МЕНЮ БУРГЕР
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burgerToggle');
    const navMenu = document.getElementById('navMenu');

    if (burger && navMenu) {
        // Открытие / закрытие по клику на иконку
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Закрытие при клике на любую ссылку в меню
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

  

