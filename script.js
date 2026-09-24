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
// 6. ОФИЦИАЛЬНЫЙ СУПЕР-СТАБИЛЬНЫЙ ВЫВОД ОТЗЫВОВ В РЕАЛЬНОМ ВРЕМЕНИ (ПО НОМЕРАМ КОЛОНОК)
// ==========================================
const SPREADSHEET_ID_LIVE = '1vRWFc0vzMKemSERcbU8PqCCD0bC0Q-Aurodclh9s_0';
const GOOGLE_JSON_URL = `https://google.com{SPREADSHEET_ID_LIVE}/gviz/tq?tqx=out:json&gid=0`;

async function loadLiveReviewsFromGoogle() {
    const containers = [
        document.getElementById('reviewsContainer'),   // Блок на русском
        document.getElementById('reviewsContainerEE')  // Блок на эстонском
    ];
    
    if (!containers[0] && !containers[1]) return;

    try {
        const response = await fetch(GOOGLE_JSON_URL);
        const text = await response.text();
        
        // Очищаем ответ от технической обертки Google
        const jsonText = text.substring(text.indexOf("google.visualization.Query.setResponse(") + 38, text.length - 2);
        const data = JSON.parse(jsonText);
        const rows = data.table.rows;

        // Если в таблице пусто, выходим
        if (!rows || rows.length === 0) return;

        const styles = ['review-mint', 'review-peach', 'review-cyan', 'review-lavender'];
        containers.forEach(container => { if(container) container.innerHTML = ''; });

        rows.forEach((row, index) => {
            // Считываем строго по номерам ячеек (0 - время, 1 - имя, 2 - отзыв, 3 - оценка)
            if (!row.c || !row.c[2]) return; // Если текста отзыва нет, пропускаем строчку

            const name = (row.c[1] && row.c[1].v) ? row.c[1].v.toString().trim() : 'Аноним';
            const review = (row.c[2] && row.c[2].v) ? row.c[2].v.toString().trim() : '';
            const starsValue = (row.c[3] && row.c[3].v) ? parseInt(row.c[3].v) : 5;
            
            if (!review) return;

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
        console.error('Критическая ошибка загрузки отзывов:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadLiveReviewsFromGoogle);

