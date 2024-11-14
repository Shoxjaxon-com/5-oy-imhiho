// Elementlarni tanlash
const button = document.querySelector('#Saqlash');
const cardsContainer = document.createElement('div'); 
cardsContainer.id = 'cards-container'; 
document.body.appendChild(cardsContainer);

// LocalStorage'dan barcha kartalarni yuklash
function loadCards() {
    cardsContainer.innerHTML = ''; // Avvalgi kartalarni tozalash
    const cards = JSON.parse(localStorage.getItem('jobCards')) || [];
    cards.forEach((card, index) => {
        const cardHTML = `
        <div class="card" id="card-${index}">
            <div class="card-header">
                <img src="${card.url}" alt="Company Logo" class="card-logo">
                <h3>${card.companyName}</h3>
            </div>
            <div class="card-body">
                <h2>${card.position}</h2>
                <p>${card.time}</p>
                <p>${card.location}</p>
                <p>Job Type: ${card.jobType}</p>
            </div>
            <div class="card-footer">
                ${card.skills.map(skill => `<span>${skill}</span>`).join(' ')}
                <button class="delete-btn" data-id="card-${index}">Delete</button>
            </div>
        </div>
        `;
        cardsContainer.innerHTML += cardHTML; 
    });
}

// Yangi karta yaratish va LocalStorage'ga qo'shish
function saveCard() {
    // Validatsiya qilish
    const url = document.querySelector('#logo-url').value.trim();
    const companyName = document.querySelector('#company-name').value.trim();
    const position = document.querySelector('#position').value.trim();
    const time = document.querySelector('#time').value;
    const jobType = document.querySelector('#job-type').value;
    const location = document.querySelector('#location').value;

    if (!url || !companyName || !position || time === 'tanlang' || jobType === 'tanlang' || location === 'tanlang') {
        alert("Barcha maydonlarni to'ldiring va to'g'ri qiymatlarni tanlang.");
        return;
    }

    const data = {
        url,
        companyName,
        position,
        time,
        jobType,
        location,
        skills: []
    };

    // Tanlangan ko'nikmalarni olish
    if (document.querySelector('#fullstack').checked) data.skills.push('Fullstack');
    if (document.querySelector('#python').checked) data.skills.push('Python');
    if (document.querySelector('#midweight').checked) data.skills.push('Midweight');
    if (document.querySelector('#react').checked) data.skills.push('React');

    // LocalStorage'ga kartani qo'shish
    const cards = JSON.parse(localStorage.getItem('jobCards')) || [];
    cards.push(data);
    localStorage.setItem('jobCards', JSON.stringify(cards));

    // Formani tozalash
    resetForm();

    // Yangi kartani yuklash
    loadCards(); // LocalStorage'dan kartalarni qayta yuklash
}

// Kartani o'chirish
function deleteCard(event) {
    if (event.target.classList.contains('delete-btn')) {
        const cardId = event.target.getAttribute('data-id');
        const cards = JSON.parse(localStorage.getItem('jobCards')) || [];
        const updatedCards = cards.filter((c, index) => `card-${index}` !== cardId);
        localStorage.setItem('jobCards', JSON.stringify(updatedCards));

        loadCards(); // LocalStorage'dan kartalarni qayta yuklash
    }
}

// Formani tozalash
function resetForm() {
    // Inputlar va checkboxlarni tozalash
    document.querySelector('#logo-url').value = '';
    document.querySelector('#company-name').value = '';
    document.querySelector('#position').value = '';
    document.querySelector('#time').value = 'tanlang';
    document.querySelector('#job-type').value = 'tanlang';
    document.querySelector('#location').value = 'tanlang';
    
    // Checkboxlarni tozalash
    document.querySelector('#fullstack').checked = false;
    document.querySelector('#python').checked = false;
    document.querySelector('#midweight').checked = false;
    document.querySelector('#react').checked = false;
}

// Karta saqlash tugmasi bosilganda saveCard funksiyasini chaqirish
button.addEventListener('click', (event) => {
    event.preventDefault(); 
    saveCard();
});

// Karta o'chirish tugmasini bosilganda deleteCard funksiyasini chaqirish
cardsContainer.addEventListener('click', deleteCard);

// Sahifa yuklanganda kartalarni yuklash
document.addEventListener('DOMContentLoaded', loadCards);