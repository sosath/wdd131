const servicios = [
    { id: 1, nombre: 'Women\'s Haircut (Style)', duracion: '60 min', precio: 30, descripcion: 'Visagism analysis and personalized professional cut.' },
    { id: 2, nombre: 'Full Hair Dye (Color)', duracion: '120 min', precio: 80, descripcion: 'Application of organic ammonia-free dye to the entire hair.' },
    { id: 3, nombre: 'Firming Facial Treatment', duracion: '90 min', precio: 65, descripcion: 'Deep cleansing and anti-aging mask with premium products.' },
    { id: 4, nombre: 'Relaxing Back Massage', duracion: '45 min', precio: 40, descripcion: 'Decontracting massage to release accumulated tension.' },
];

function renderServices() {
    const container = document.getElementById('services-container');
    if (!container) return;

    let servicesHTML = '';

    servicios.forEach(service => {
        servicesHTML += `
            <div class="service-card" data-service-name="${service.nombre}">
                <h3 class="heading-font">${service.nombre}</h3>
                <p>${service.descripcion}</p>
                <p><strong>Duration:</strong> ${service.duracion}</p>
                <p class="price">Price: $${service.precio}</p>
                <a href="contact.html?service=${service.id}" class="btn small-btn" onclick="saveLastService('${service.nombre}')">Book Now</a>
            </div>
        `;
    });

    container.innerHTML = servicesHTML;
}

function saveLastService(serviceName) {
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem('lastServiceName', serviceName);
    }
}

function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const feedback = document.getElementById('formFeedback');

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const serviceSelect = document.getElementById('serviceSelect').value;
    
    if (fullName === '' || email === '' || serviceSelect === '') {
        feedback.className = 'feedback-message feedback-error';
        feedback.innerHTML = `
            <p><strong>Reservation Error:</strong> Please complete all required fields.</p>
        `;
        feedback.style.display = 'block';
        return;
    }
    
    if (typeof(Storage) !== "undefined") {
        const reservationData = {
            name: fullName,
            service: serviceSelect,
            date: new Date().toLocaleDateString()
        };
        localStorage.setItem('lastReservation', JSON.stringify(reservationData));
    }

    const selectedService = servicios.find(s => s.id == serviceSelect)?.nombre || serviceSelect;
    feedback.className = 'feedback-message feedback-success';
    feedback.innerHTML = `
        <p>Thank you, <strong>${fullName}</strong>! Your request for <strong>${selectedService}</strong> has been received. We will contact you soon.</p>
    `;
    feedback.style.display = 'block';

    form.reset();
}

function initContactPage() {
    const select = document.getElementById('serviceSelect');
    if (select) {
        servicios.forEach(service => {
            const option = document.createElement('option');
            option.value = service.id;
            option.textContent = service.nombre;
            select.appendChild(option);
        });

        if (typeof(Storage) !== "undefined") {
            const lastServiceName = localStorage.getItem('lastServiceName');
            if (lastServiceName) {
                const lastService = servicios.find(s => s.nombre === lastServiceName);
                if (lastService) {
                    select.value = lastService.id;
                }
            }
        }
    }
}

function showWelcomeMessage() {
    const welcomeDiv = document.getElementById('welcome-message');
    if (!welcomeDiv) return;

    if (typeof(Storage) !== "undefined") {
        const lastReservationJSON = localStorage.getItem('lastReservation');
        const lastServiceName = localStorage.getItem('lastServiceName');

        if (lastReservationJSON) {
            const data = JSON.parse(lastReservationJSON);
            welcomeDiv.innerHTML = `
                <h2 class="heading-font">Welcome Back, ${data.name}!</h2>
                <p class="body-font">We see your last booking was for **${servicios.find(s => s.id == data.service)?.nombre || data.service}** on ${data.date}.</p>
                <p class="body-font">We're ready for your next visit.</p>
            `;
        } else if (lastServiceName) {
             welcomeDiv.innerHTML = `
                <h2 class="heading-font">Welcome to Luz y Estilo!</h2>
                <p class="body-font">We saw you were interested in our **${lastServiceName}** service. Book your appointment today!</p>
            `;
        } else {
             welcomeDiv.innerHTML = `
                <h2 class="heading-font">Welcome to Luz y Estilo!</h2>
                <p class="body-font">Your space for relaxation and transformation. Discover our exclusive services.</p>
            `;
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', handleFormSubmit);
        initContactPage();
    }
    
    renderServices();

    showWelcomeMessage();
});