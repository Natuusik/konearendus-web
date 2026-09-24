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
