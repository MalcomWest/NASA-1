const input = document.getElementById('locationInput');
const suggestionsBox = document.getElementById('suggestions');
const tempSelect = document.getElementById('tempComfort');
const humiditySelect = document.getElementById('humidityComfort');
let selectedLat = null, selectedLon = null;

// ===== Load stored comfort settings =====
window.addEventListener('DOMContentLoaded', () => {
const savedTemp = localStorage.getItem('comfortTemp');
const savedHumidity = localStorage.getItem('comfortHumidity');

if (savedTemp) tempSelect.value = savedTemp;
if (savedHumidity) humiditySelect.value = savedHumidity;
});

// ===== Save comfort settings on change =====
tempSelect.addEventListener('change', () => {
localStorage.setItem('comfortTemp', tempSelect.value);
});
humiditySelect.addEventListener('change', () => {
localStorage.setItem('comfortHumidity', humiditySelect.value);
});

// ===== Location autocomplete =====
input.addEventListener('input', async () => {
const q = input.value.trim();
selectedLat = selectedLon = null;
suggestionsBox.innerHTML = '';
if (q.length < 2) return;
try {
    const resp = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(q)}, India`);
    const places = await resp.json();
    places.forEach(p => {
    const d = document.createElement('div');
    d.textContent = p.display_name;
    d.addEventListener('click', () => {
        input.value = p.display_name;
        selectedLat = p.lat;
        selectedLon = p.lon;
        suggestionsBox.innerHTML = '';
    });
    suggestionsBox.appendChild(d);
    });
} catch (err) {
    console.error('Geocoding error:', err);
}
});

// ===== Weather fetch =====
document.getElementById('btnGet').addEventListener('click', async () => {
if (!selectedLat || !selectedLon) {
    alert('Please select a suggestion to continue.');
    return;
}

try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${selectedLat}&longitude=${selectedLon}&current_weather=true&hourly=relativehumidity_2m&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Asia/Kolkata`;
    const wresp = await fetch(url);
    const wdata = await wresp.json();

    // extract comfort prefs
    const [tMin, tMax] = tempSelect.value.split('-').map(Number);
    const [hMin, hMax] = humiditySelect.value.split('-').map(Number);

    const currentTemp = wdata.current_weather.temperature;
    const currentWind = wdata.current_weather.windspeed;

    // humidity at current hour
    const nowIndex = wdata.hourly.time.indexOf(wdata.current_weather.time);
    const currentHumidity = nowIndex >= 0 ? wdata.hourly.relativehumidity_2m[nowIndex] : 50;

    let comfortText = "Good";
    let comfortClass = "good";

    if (currentTemp < tMin || currentTemp > tMax || currentHumidity < hMin || currentHumidity > hMax) {
    comfortText = "Uncomfortable";
    comfortClass = "uncomfortable";
    }
    if (currentTemp > tMax + 5 || currentTemp < tMin - 5 || currentHumidity > hMax + 10 || currentHumidity < hMin - 10) {
    comfortText = "Bad";
    comfortClass = "bad";
    }

    let html = `
    <div class="card">
        <h3>📍 ${input.value}</h3>
        <p><b>Current:</b> ${currentTemp}°C</p>
        <p><b>Wind:</b> ${currentWind} m/s</p>
        <p><b>Humidity:</b> ${currentHumidity}%</p>
    </div>
    <div class="comfort ${comfortClass}">
        Comfort Level: ${comfortText}
    </div>
    <h4 style="margin-top:15px;">3-Day Forecast:</h4>
    <ul>
    `;
    for (let i = 0; i < 3; i++) {
    html += `<li><b>${wdata.daily.time[i]}</b>: 🌡️ ${wdata.daily.temperature_2m_min[i]}°C - ${wdata.daily.temperature_2m_max[i]}°C</li>`;
    }
    html += `</ul>`;
    document.getElementById('result').innerHTML = html;
} catch (err) {
    document.getElementById('result').innerHTML = `<p style="color:yellow;">Error fetching weather.</p>`;
}
});