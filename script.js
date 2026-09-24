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
// ==========================================
// 19. АВТОМАТИЧЕСКИЙ ВЫВОД ЖИВЫХ ОТЗЫВОВ ИЗ GOOGLE ТАБЛИЦЫ
// ==========================================
const SPREADSHEET_KEY = '2PACX-1vRWFc0vzMKemSERcbU8PqCCD0bC0Q-Aurodclh9s_0C4w-NgG26L8Bbnr0qLk-kPKw5qnobkJTsuBaD';
const REVIEWS_FETCH_URL = `https://google.com{SPREADSHEET_KEY}/pub?output=csv`;

async function loadLiveReviewsFromGoogle() {
    const containers = [
        document.getElementById('reviewsContainer'),   // Блок на русской версии
        document.getElementById('reviewsContainerEE')  // Блок на эстонской версии
    ];
    
    // Если на странице нет блоков отзывов, завершаем работу функции
    if (!containers[0] && !containers[1]) return;

    try {
        const response = await fetch(REVIEWS_FETCH_URL);
        const csvText = await response.text();
        
        // Разбираем CSV-строки из таблицы
        const lines = csvText.split('\n').map(line => line.split(','));
        if (lines.length <= 1) return; // Если в таблице только шапка, выходим

        // Пастельные стили для красивого чередования карточек
        const styles = ['review-mint', 'review-peach', 'review-cyan', 'review-lavender'];

        // Очищаем статические примеры перед выводом реальных данных
        containers.forEach(container => { if(container) container.innerHTML = ''; });

        // Перебираем строчки (пропуская первую строчку-заголовок)
        lines.slice(1).forEach((row, index) => {
            if (row.length < 3) return;

            // Очищаем данные от лишних кавычек Google
            const name = row[1] ? row[1].replace(/"/g, '').trim() : 'Аноним';
            const review = row[2] ? row[2].replace(/"/g, '').trim() : '';
            const starsNum = row[3] ? parseInt(row[3].replace(/"/g, '')) : 5;
            
            // Если текст отзыва пустой, пропускаем строчку
            if (!review) return;

            const stars = '⭐'.repeat(isNaN(starsNum) ? 5 : starsNum);
            const currentStyle = styles[index % styles.length];

            // Формируем красивую пастельную карточку отзыва
            const cardHTML = `
                <div class="review-premium-card ${currentStyle}">
                    <div class="review-header">
                        <span class="review-avatar">👩‍👦</span>
                        <div>
                            <h5>${name}</h5>
                            <div class="review-stars">${stars}</div>
                        </div>
                    </div>
                    <p class="review-text">«${review}»</p>
                </div>
            `;

            // Выводим карточку на страницу
            containers.forEach(container => {
                if (container) {
                    container.innerHTML += cardHTML;
                }
            });
        });

    } catch (error) {
        console.error('Не удалось загрузить отзывы:', error);
    }
}

// Автоматический запуск считывания при открытии сайта
document.addEventListener('DOMContentLoaded', loadLiveReviewsFromGoogle);
