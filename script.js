// Плавная прокрутка только для локальных ссылок-якорей (начинающихся с #)
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Проверяем: если ссылка ведет на другой файл (.html), разрешаем обычный переход
        if (!targetId.startsWith('#')) {
            return; 
        }
        
        // Если это ссылка-якорь для скролла внутри страницы
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Обработка отправки формы записи (Русская версия)
const speechForm = document.getElementById('speechForm');
if (speechForm) {
    speechForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const contact = document.getElementById('email').value;
        
        alert(`Спасибо, ${name}! Ваша заявка успешно принята. Специалист свяжется с вами по контакту: ${contact}`);
        this.reset();
    });
}

// Обработка отправки формы записи (Эстонская версия)
const speechFormEE = document.getElementById('speechFormEE');
if (speechFormEE) {
    speechFormEE.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('nameEE').value;
        const contact = document.getElementById('emailEE').value;
        
        alert(`Täname, ${name}! Teie avaldus on edukalt vastu võetud. Spetsialist võtab teiega ühendust: ${contact}`);
        this.reset();
    });
}
// Логика работы мобильного меню-бургера
const burgerToggle = document.getElementById('burgerToggle');
const navMenu = document.getElementById('navMenu');

if (burgerToggle && navMenu) {
    // Открытие/закрытие меню по клику на иконку
    burgerToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('open');
    });

    // Автоматическое закрытие меню при клике на любую ссылку внутри него
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            burgerToggle.classList.remove('active');
            navMenu.classList.remove('open');
        });
    });
}
// Логика раскрытия дополнительных отзывов (Русская версия)
const toggleReviewsBtn = document.getElementById('toggleReviewsBtn');
const hiddenReviewsBlock = document.getElementById('hiddenReviewsBlock');

if (toggleReviewsBtn && hiddenReviewsBlock) {
    toggleReviewsBtn.addEventListener('click', function() {
        hiddenReviewsBlock.classList.toggle('show');
        if (hiddenReviewsBlock.classList.contains('show')) {
            this.textContent = 'Свернуть отзывы ▲';
        } else {
            this.textContent = 'Смотреть все отзывы ▼';
        }
    });
}

// Логика раскрытия дополнительных отзывов (Эстонская версия)
const toggleReviewsBtnEE = document.getElementById('toggleReviewsBtnEE');
const hiddenReviewsBlockEE = document.getElementById('hiddenReviewsBlockEE');

if (toggleReviewsBtnEE && hiddenReviewsBlockEE) {
    toggleReviewsBtnEE.addEventListener('click', function() {
        hiddenReviewsBlockEE.classList.toggle('show');
        if (hiddenReviewsBlockEE.classList.contains('show')) {
            this.textContent = 'Sule tagasiside ▲';
        } else {
            this.textContent = 'Vaata kõiki tagasisidesid ▼';
        }
    });
}
