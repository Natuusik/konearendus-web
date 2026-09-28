
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

  
// ==========================================
// 6. ЖИВЫЕ ОТЗЫВЫ ИЗ GOOGLE ТАБЛИЦЫ
// ==========================================

const SPREADSHEET_ID_FINAL = '1vRWFc0vzMKemSERcbU8PqCCD0bC0Q-Aurodclh9s_0';

const LIVE_JSON_ENDPOINT =
`https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID_FINAL}/gviz/tq?tqx=out:json&gid=0`;

async function loadLiveReviews() {

    const containers = [
        document.getElementById('reviewsContainer'),
        document.getElementById('reviewsContainerEE')
    ];

    if (!containers[0] && !containers[1]) {
        return;
    }

    try {

        console.log('Загружаем отзывы...');
        console.log('URL:', LIVE_JSON_ENDPOINT);

        const response = await fetch(LIVE_JSON_ENDPOINT);

        if (!response.ok) {
            throw new Error(`HTTP ошибка: ${response.status}`);
        }

        const text = await response.text();

        const prefix = 'google.visualization.Query.setResponse(';

        const start = text.indexOf(prefix);

        if (start === -1) {
            throw new Error('Google не вернул корректный JSON');
        }

        const cleanJson = text.substring(
            start + prefix.length,
            text.length - 2
        );

        const parsedData = JSON.parse(cleanJson);

        if (
            !parsedData ||
            !parsedData.table ||
            !parsedData.table.rows
        ) {
            throw new Error('Структура данных Google Sheets не найдена');
        }

        const tableRows = parsedData.table.rows;

        console.log('Полученные строки:', tableRows);

        const styles = [
            'review-mint',
            'review-peach',
            'review-cyan',
            'review-lavender'
        ];

        containers.forEach(container => {
            if (container) {
                container.innerHTML = '';
            }
        });

        tableRows.forEach((row, index) => {

            if (!row.c) return;

            // Ожидаем структуру:
            // A = дата
            // B = имя
            // C = отзыв
            // D = оценка

            const name =
                row.c[1]?.v?.toString().trim() || 'Аноним';

            const review =
                row.c[2]?.v?.toString().trim() || '';

            const starsValue =
                parseInt(row.c[3]?.v) || 5;

            if (!review) return;

            const stars = '⭐'.repeat(
                Math.min(Math.max(starsValue, 1), 5)
            );

            const currentStyle =
                styles[index % styles.length];

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
                if (container) {
                    container.insertAdjacentHTML(
                        'beforeend',
                        cardHTML
                    );
                }
            });
        });

        console.log('Отзывы успешно загружены');

    } catch (error) {

        console.error(
            'Ошибка при загрузке отзывов:',
            error
        );

        containers.forEach(container => {
            if (container) {
                container.innerHTML = `
                    <div class="review-premium-card review-peach">
                        <p>
                            Временно не удалось загрузить отзывы.
                        </p>
                    </div>
                `;
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', loadLiveReviews);




  document.addEventListener('DOMContentLoaded', () => {
    const toggleFormBtn = document.getElementById('toggle-form-btn');
    const formWrapper = document.getElementById('contact-form-wrapper');
    let isFormOpen = false;

    toggleFormBtn.addEventListener('click', () => {
      isFormOpen = !isFormOpen;
      
      // Показываем или скрываем форму
      formWrapper.classList.toggle('hidden', !isFormOpen);

      // Меняем текст на кнопке
      toggleFormBtn.textContent = isFormOpen 
        ? 'Скрыть форму записи' 
        : 'Заполнить форму на сайте';
    });
  });

document.addEventListener('DOMContentLoaded', () => {

    forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});
