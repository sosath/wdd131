document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

const temperature = 12; // °C
const windSpeed = 10;   // km/h

const calculateWindChill = (tempC, windKmh) => Math.round(13.12 + 0.6215 * tempC - 11.37 * Math.pow(windKmh, 0.16) + 0.3965 * tempC * Math.pow(windKmh, 0.16));

function displayWindChill(tempC, windKmh) {
    const windchillEl = document.getElementById("windchill");

    if (tempC <= 10 && windKmh > 4.8) {
        windchillEl.textContent = `${calculateWindChill(tempC, windKmh)} °C`;
    } else {
        windchillEl.textContent = "N/A";
    }
}

displayWindChill(temperature, windSpeed);