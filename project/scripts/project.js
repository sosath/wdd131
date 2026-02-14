const destinations = [
    { id: "uyuni", name: "Salar de Uyuni", category: "Nature", description: "The world's largest salt flat, a surreal natural mirror under the Andean sky.", image: "images/uyuni.webp", featured: true },
    { id: "madidi", name: "Madidi National Park", category: "Nature", description: "One of the most biodiverse protected areas in the world, deep in the Amazon.", image: "images/madidi.webp", featured: true },
    { id: "titicaca", name: "Lake Titicaca", category: "Nature", description: "The highest navigable lake on Earth, shared with Peru and sacred to the Incas.", image: "images/titicaca.webp", featured: true },
    { id: "colorada", name: "Laguna Colorada", category: "Nature", description: "A striking red-colored lake filled with thousands of Andean flamingos.", image: "images/colorada.webp", featured: false },
    { id: "torotoro", name: "Toro Toro Park", category: "Nature", description: "A land of dinosaurs with fossilized tracks, deep canyons, and mysterious caves.", image: "images/torotoro.webp", featured: false },
    { id: "sajama", name: "Sajama National Park", category: "Nature", description: "Home to Bolivia's highest peak and the world's highest forest of Queñua trees.", image: "images/sajama.webp", featured: false },
    { id: "tiwanaku", name: "Tiwanaku Ruins", category: "Cultural", description: "The spiritual and political center of a powerful pre-Inca civilization.", image: "images/tiwanaku.webp", featured: true },
    { id: "sucre", name: "Sucre Old Town", category: "Cultural", description: "The 'White City', famous for its well-preserved Spanish colonial architecture.", image: "images/sucre.webp", featured: true },
    { id: "potosi", name: "Cerro Rico (Potosí)", category: "Cultural", description: "The historic silver mines that once funded the Spanish Empire's global reach.", image: "images/potosi.webp", featured: false },
    { id: "misiones", name: "Jesuit Missions", category: "Cultural", description: "Beautifully preserved Chiquitos missions, a UNESCO World Heritage living culture.", image: "images/misiones.webp", featured: false },
    { id: "tarabuco", name: "Tarabuco Market", category: "Cultural", description: "A traditional indigenous market famous for the Yampara people's weaving.", image: "images/tarabuco.webp", featured: false },
    { id: "isla-sol", name: "Isla del Sol", category: "Cultural", description: "According to legend, the birthplace of the Inca sun god, Inti.", image: "images/isla-sol.webp", featured: false },
    { id: "gustu", name: "Gustu Restaurant", category: "Food", description: "High-end dining in La Paz that uses 100% Bolivian-sourced ingredients.", image: "images/gustu.webp", featured: true },
    { id: "mercado-lanz", name: "Mercado Lanza", category: "Food", description: "The heart of La Paz street food, famous for fruit salads and sandwiches.", image: "images/lanza.webp", featured: false },
    { id: "salteñas", name: "The Salteña Route", category: "Food", description: "A tour through the best 'salteñerías' to taste Bolivia's iconic breakfast pastry.", image: "images/saltenas.webp", featured: false },
    { id: "tarija-wine", name: "Tarija Vineyards", category: "Food", description: "High-altitude wine tasting in the beautiful central valley of Tarija.", image: "images/tarija.webp", featured: false },
    { id: "coffee-yungas", name: "Yungas Coffee Farm", category: "Food", description: "Learn how some of the world's best organic high-altitude coffee is grown.", image: "images/coffee.webp", featured: false },
    { id: "pique-macho", name: "Cochabamba Food Tour", category: "Food", description: "Explore the culinary capital of Bolivia and its famous Pique Macho dish.", image: "images/cochabamba.webp", featured: false }
];

const menuBtn = document.querySelector('#menu-button');
const nav = document.querySelector('#main-nav');
const featuredGrid = document.querySelector('#featured-grid');
const destGrid = document.querySelector('#destinations-grid');
const favGrid = document.querySelector('#favorites-grid');

menuBtn?.addEventListener('click', () => {
    nav.classList.toggle('open');
    if (nav.classList.contains('open')) {
        menuBtn.textContent = '✕';
    } else {
        menuBtn.textContent = '☰';
    }
});

const displayCards = (items, container) => {
    if (!container) return;
    container.innerHTML = ""; 
    
    const isPlannerPage = container.id === 'favorites-grid';

    items.forEach(item => {
        const card = document.createElement("article");
        card.className = "card";
        
        const buttonHTML = isPlannerPage 
            ? `<button class="fav-btn remove-btn" onclick="removeFromFavorites('${item.id}')">Remove 🗑</button>`
            : `<button class="fav-btn" onclick="addToFavorites('${item.id}')">Save to Planner ❤</button>`;

        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}" loading="lazy">
            <div class="card-content">
                <div>
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                </div>
                ${buttonHTML}
            </div>
        `;
        container.appendChild(card);
    });
};

const showToast = (message) => {
    let container = document.querySelector('#toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>✔</span> ${message}`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3500);
};

window.addToFavorites = (id) => {
    let favs = JSON.parse(localStorage.getItem('boliviaFavs')) || [];
    
    if (!favs.includes(id)) {
        favs.push(id);
        localStorage.setItem('boliviaFavs', JSON.stringify(favs));
        
        showToast("Destination saved to your planner!");
    } else {
        showToast("This place is already in your list.");
    }
};

window.removeFromFavorites = (id) => {
    let favs = JSON.parse(localStorage.getItem('boliviaFavs')) || [];
    
    favs = favs.filter(favId => favId !== id);
    
    localStorage.setItem('boliviaFavs', JSON.stringify(favs));
    
    renderFavorites();
};

const renderFavorites = () => {
    const favIds = JSON.parse(localStorage.getItem('boliviaFavs')) || [];
    const favObjects = destinations.filter(d => favIds.includes(d.id));
    
    if (favGrid) {
        if (favObjects.length === 0) {
            favGrid.innerHTML = `<p style="text-align:center; grid-column: 1/-1;">Your planner is empty. Start exploring!</p>`;
        } else {
            displayCards(favObjects, favGrid);
        }
    }
};

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        const category = e.target.dataset.category;
        const filtered = category === "all" ? destinations : destinations.filter(d => d.category === category);
        displayCards(filtered, destGrid);
    });
});

const plannerForm = document.querySelector('#planner-form');
plannerForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    document.querySelector('#form-message').innerHTML = `
        <div style="background: #d4edda; color: #155724; padding: 1rem; border-radius: 5px; margin-top: 1rem;">
            Thank you, ${name}! We have received your inquiry for Explora Bolivia.
        </div>`;
    plannerForm.reset();
});

document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('currentyear');
    if(yearSpan) yearSpan.textContent = new Date().getFullYear();
    
    const lastMod = document.createElement('p');
    lastMod.className = 'footer-info';
    lastMod.textContent = `Last Update: ${document.lastModified}`;
    document.querySelector('footer').appendChild(lastMod);

    if (featuredGrid) displayCards(destinations.filter(d => d.featured), featuredGrid);
    if (destGrid) displayCards(destinations, destGrid);
    if (favGrid) renderFavorites();
});