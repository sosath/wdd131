const products = [
    { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
    { id: "fc-2050", name: "power laces", averagerating: 4.7 },
    { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
    { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
    { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];

document.addEventListener("DOMContentLoaded", () => {
    const productSelect = document.getElementById("productName");
    const yearSpan = document.getElementById("currentyear");
    const modSpan = document.getElementById("lastModified");

    if (productSelect) {
        products.forEach(product => {
            const option = document.createElement("option");
            option.value = product.id;
            option.textContent = product.name;
            productSelect.appendChild(option);
        });
    }

    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (modSpan) modSpan.textContent = document.lastModified;

    if (window.location.pathname.includes("review.html")) {
        let numReviews = Number(window.localStorage.getItem("reviewCount")) || 0;
        numReviews++;
        localStorage.setItem("reviewCount", numReviews);
        
        const counterDisplay = document.getElementById("counter");
        if (counterDisplay) counterDisplay.textContent = numReviews;
    }
});