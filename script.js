// Плавная прокрутка (скролл) при клике по ссылкам в меню
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Клик по карточке онлайн занятий (открытие/закрытие деталей)
const onlineCard = document.getElementById('onlineCard');
if (onlineCard) {
    onlineCard.addEventListener('click', function() {
        this.classList.toggle('active');
    });
}

// Обработка отправки формы записи
document.getElementById('speechForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const contact = document.getElementById('email').value;
    
    alert(`Спасибо, ${name}! Ваша заявка успешно принята. Специалист свяжется с вами по контакту: ${contact}`);
    
    this.reset();
});
// Обработка отправки эстонской формы записи
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
