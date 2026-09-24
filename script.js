// ==========================================
// 1. ПЛАВНАЯ ПРОКРУТКА ДЛЯ ССЫЛОК-ЯКОРЕЙ
// ==========================================
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Если ссылка ведет на другой файл, разрешаем обычный переход
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
// 5. АВТОМАТИЧЕСКИЙ ВЫВОД ОТЗЫВОВ ИЗ GOOGLE ТАБЛИЦЫ
// ==========================================
const SPREADSHEET_KEY = '2PACX-1vRWFc0vzMKemSERcbU8PqCCD0bC0Q-Aurodclh9s_0C4w-NgG26L8Bbnr0qLk-kPKw5qnobkJTsuBaD';
const REVIEWS_FETCH_URL = `https://google.com{SPREADSHEET_KEY}/pub?output=csv`;

async function loadLiveReviewsFromGoogle() {
    const containers = [
        document.getElementById('reviewsContainer'),
        document.getElementById('reviewsContainerEE')
    ];
    
    if (!containers[0] && !containers[1]) return;

    try {
        const response = await fetch(REVIEWS_FETCH_URL);
        const csvText = await response.text();
        
        const lines = csvText.split('\n').map(line => line.split(','));
        if (lines.length <= 1) return;

        const styles = ['review-mint', 'review-peach', 'review-cyan', 'review-lavender'];
        containers.forEach(container => { if(container) container.innerHTML = ''; });

        lines.slice(1).forEach((row, index) => {
            if (row.length < 3) return;

            const name = row[1] ? row[1].replace(/"/g, '').trim() : 'Аноним';
            const review = row[2] ? row[2].replace(/"/g, '').trim() : '';
            const starsNum = row[3] ? parseInt(row[3].replace(/"/g, '')) : 5;
            
            if (!review) return;

            const stars = '⭐'.repeat(isNaN(starsNum) ? 5 : starsNum);
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
        console.error('Не удалось загрузить отзывы:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadLiveReviewsFromGoogle);
