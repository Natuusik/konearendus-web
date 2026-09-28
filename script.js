document.getElementById('review-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Стопим перезагрузку страницы

  const form = event.target;
  const btn = document.getElementById('submit-btn');
  const statusDiv = document.getElementById('form-status');

  // 1. Показываем клиенту, что процесс пошел
  btn.disabled = true;
  statusDiv.style.display = 'block';
  statusDiv.style.color = '#333';
  statusDiv.innerHTML = 'Ваш отзыв обрабатывается и отправляется на модерацию...';

  // 2. Собираем все данные из полей HTML формы
  const formData = new FormData(form);

  // 3. Переводим данные в формат JSON (без этого Web3Forms выдаст ошибку)
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  // 4. Отправляем данные на сервера Web3Forms
  fetch('https://web3forms.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: json
  })
  .then(async (response) => {
    const result = await response.json();
    
    if (response.ok && result.success) {
      // Если всё улетело успешно — красим текст в зеленый
      statusDiv.style.color = 'green';
      statusDiv.innerHTML = 'Спасибо! Ваш отзыв успешно отправлен и появится на сайте после проверки.';
      form.reset(); // Очищаем форму для следующего отзыва
    } else {
      // Если сервис вернул ошибку (например, ключ не подошел)
      statusDiv.style.color = 'red';
      statusDiv.innerHTML = result.message || 'Произошла ошибка при отправке.';
    }
  })
  .catch(error => {
    // Если упал сам интернет или заблокировал браузер локально
    statusDiv.style.color = 'red';
    statusDiv.innerHTML = 'Произошла сетевая ошибка. Пожалуйста, попробуйте позже.';
  })
  .finally(() => {
    // В любом случае возвращаем кнопку в рабочее состояние
    btn.disabled = false;
  });
});


// ==========================================
// 1. ПЛАВНАЯ ПРОКРУТКА ДЛЯ ССЫЛОК-ЯКОРЕЙ
// ==========================================
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
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
        e.preventDefault();
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
    // --- Мобильное меню (Бургер) ---
    const burger = document.getElementById('burgerToggle');
    const navMenu = document.getElementById('navMenu');

    if (burger && navMenu) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Закрывать меню при клике на любую ссылку внутри
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});
