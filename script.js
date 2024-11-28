// Pop-up logica
function closePopup() {
    document.querySelector('.popup').style.display = 'none';
    document.cookie = "popup_seen=true; path=/; max-age=" + 60 * 60 * 24; // 1 dag
}

if (!document.cookie.includes("popup_seen=true")) {
    document.querySelector('.popup').style.display = 'block';
}

var map = L.map('mapContainer').setView([51.05, 3.72], 13); // Voor Gent
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Weer-API
fetch('https://api.openweathermap.org/data/2.5/weather?q=Ghent&units=metric&appid=c39510199f75c8d6b5fe3c79fc0d5f74')
    .then(response => response.json())
    .then(data => {
        document.querySelector('.weather').innerText =
            `Temperatuur in Gent: ${data.main.temp}°C, ${data.weather[0].description}`;
    });
