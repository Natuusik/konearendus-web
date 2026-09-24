// ==========================================
// 1. ПЛАВНАЯ ПРОКРУТКА ДЛЯ ССЫЛОК-ЯКОРЕЙ
// ==========================================
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Если ссылка ведет на другой файл или внешний сайт, разрешаем обычный переход
        if (!targetId.startsWith('#')) return; 
        
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// 2. МОБИЛЬНОЕ МЕНЮ БУРГЕР
// ==========================================
const burgerToggle = document.getElementById('burgerToggle');
const navMenu = document.getElementById('navMenu');

if (burgerToggle && navMenu) {
    burgerToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            burgerToggle.classList.remove('active');
            navMenu.classList.remove('open');
        });
    });
}

// ==========================================
// 3. ОТПРАВКА ФОРМЫ ЗАПИСИ (РУССКАЯ ВЕРСИЯ)
// ==========================================
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

// ==========================================
// 4. ОТПРАВКА ФОРМЫ ЗАПИСИ (ЭСТОНСКАЯ ВЕРСИЯ)
// ==========================================
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

// ==========================================
// 5. ИНТЕРАКТИВНОЕ РАСКРЫТИЕ ОТЗЫВОВ НА ГЛАВНОЙ СТРАНИЦЕ
// ==========================================
const toggleReviewsBtn = document.getElementById('toggleReviewsBtn');
const hiddenReviewsBlock = document.getElementById('hiddenReviewsBlock');

if (toggleReviewsBtn && hiddenReviewsBlock) {
    toggleReviewsBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Предотвращает прыжок страницы вверх
        hiddenReviewsBlock.classList.toggle('show');
        if (hiddenReviewsBlock.classList.contains('show')) {
            this.textContent = 'Свернуть отзывы ▲';
        } else {
            this.textContent = 'Смотреть все отзывы ▼';
        }
    });
}

const toggleReviewsBtnEE = document.getElementById('toggleReviewsBtnEE');
const hiddenReviewsBlockEE = document.getElementById('hiddenReviewsBlockEE');

if (toggleReviewsBtnEE && hiddenReviewsBlockEE) {
    toggleReviewsBtnEE.addEventListener('click', function(e) {
        e.preventDefault();
        hiddenReviewsBlockEE.classList.toggle('show');
        if (hiddenReviewsBlockEE.classList.contains('show')) {
            this.textContent = 'Sule tagasiside ▲';
        } else {
            this.textContent = 'Vaata kõiki tagasisidesid ▼';
        }
    });
}

// ==========================================
// 6. СУПЕР-СТАБИЛЬНЫЙ АВТОМАТИЧЕСКИЙ ВЫВОД ЖИВЫХ ОТЗЫВОВ
// ==========================================
const GOOGLE_PUB_URL = 'https://google.com';

async function loadLiveReviewsFromGoogle() {
    const containers = [
        document.getElementById('reviewsContainer'),   // Блок на русском
        document.getElementById('reviewsContainerEE')  // Блок на эстонском
    ];
    
    if (!containers[0] && !containers[1]) return;

    try {
        const response = await fetch(GOOGLE_PUB_URL);
        const csvText = await response.text();
        
        // Разделяем строки таблицы
        const lines = csvText.split('\n').map(line => line.split(','));
        if (lines.length <= 1) return;

        const styles = ['review-mint', 'review-peach', 'review-cyan', 'review-lavender'];
        
        // Очищаем демонстрационные отзывы перед выводом реальных данных
        containers.forEach(container => { if(container) container.innerHTML = ''; });

        // Перебираем строчки (пропуская первую строку-заголовок)
        lines.slice(1).forEach((row, index) => {
            if (row.length < 3) return;

            // Очищаем ячейки от лишних кавычек Google (1 - имя, 2 - отзыв, 3 - оценка)
            const name = row[1] ? row[1].replace(/"/g, '').trim() : 'Аноним';
            const review = row[2] ? row[2].replace(/"/g, '').trim() : '';
            const starsValue = row[3] ? parseInt(row[3].replace(/"/g, '')) : 5;
            
            if (!review) return; // Пропускаем пустые строки

            const starsNum = isNaN(starsValue) ? 5 : starsValue;
            const stars = '⭐'.repeat(starsNum);
            const currentStyle = styles[index % styles.length];

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

            containers.forEach(container => {
                if (container) container.innerHTML += cardHTML;
            });
        });

    } catch (error) {
        console.error('Ошибка загрузки живых отзывов:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadLiveReviewsFromGoogle);


