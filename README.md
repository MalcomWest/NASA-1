# 🌤 Weather Comfort App

A modern weather web app built with **HTML, CSS, and JavaScript** that shows real-time weather and a 3-day forecast for any location in India (and globally).  
Users can define their **personal comfort settings** for temperature and humidity, and the app evaluates whether the current weather is **Good, Uncomfortable, or Bad**. Comfort preferences are stored in **localStorage**, so they persist across sessions.

---

## ✨ Features
- 🌍 **Location search with auto-suggestions** (powered by [Nominatim OpenStreetMap API](https://nominatim.org/))
- ⛅ **Real-time weather & 3-day forecast** (powered by [Open-Meteo API](https://open-meteo.com/))
- 🎨 **Modern UI** with animated gradient background, glassmorphism cards, and custom scrollbar
- 📊 **Comfort evaluation** based on:
  - Temperature range (user-defined)
  - Humidity range (user-defined)
- 💾 **Persistent comfort settings** via localStorage
- 🖱 **Custom styled scrollbar** for smooth UI experience

---

## 🛠 Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **APIs:**
  - [Nominatim OpenStreetMap](https://nominatim.org/) → Location search
  - [Open-Meteo](https://open-meteo.com/) → Weather & forecast data
- **Browser API:** LocalStorage (save user comfort preferences)

---

## 📂 Project Structure

weather-app/
│── index.html # Main HTML file
│── style.css # Optional: external CSS
│── script.js # Optional: external JS
│── README.md # Project documentation


---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/weather-comfort-app.git
cd weather-comfort-app

2. Open in browser

Simply open index.html in any modern browser.
No server setup required; everything runs client-side.
⚙️ Usage

    Enter your location (e.g., Adhartal, Mumbai, Delhi).

    Select from the auto-suggested dropdown.

    (Optional) Adjust comfort settings:

        Select preferred temperature range.

        Select preferred humidity range.

    Click Get Weather.

    View:

        Current weather (temperature, wind, humidity)

        Comfort level: Good / Uncomfortable / Bad

        3-day forecast

📸 UI Preview

Add screenshots or GIF here to showcase the UI.
🔒 Privacy

    No API keys required — both APIs are free and public.

    Comfort settings are stored locally in the browser (via localStorage).

    No user data is sent to any external server except the weather/geocoding APIs.

🧩 How It Works

    User Input:

        User types location → autocomplete suggestions appear.

        User selects a location from suggestions.

    Fetching Weather:

        App calls Open-Meteo API for current weather & 3-day forecast.

        App also fetches hourly humidity for comfort calculation.

    Comfort Evaluation:

        Reads user-defined temperature & humidity ranges from dropdowns.

        Compares current weather values:

            Within comfortable range → Good

            Slightly outside → Uncomfortable

            Far outside → Bad

        Displays comfort level in a color-coded card.

    Persistence:

        Comfort settings saved to localStorage → remembered on next visit.

Flow Diagram (Text Representation):

User inputs location
        │
        ▼
Autocomplete suggestions (Nominatim API)
        │
        ▼
User selects location
        │
        ▼
Fetch current weather & forecast (Open-Meteo API)
        │
        ▼
Evaluate Comfort (compare with user's temp/humidity prefs)
        │
        ▼
Display Weather Card + 3-Day Forecast + Comfort Level
        │
        ▼
Store preferences in localStorage

🛠 Future Improvements

    Add weather icons/emojis for daily forecast (☀️ 🌧 🌩)

    Save & auto-load last searched location

    Support multiple favorite cities

    Option to switch between Celsius and Fahrenheit

    Add rain/wind alerts based on thresholds

📜 License

This project is licensed under the MIT License.
Feel free to use, modify, and share!

👨‍💻 Built with ❤️ using HTML, CSS, and JavaScript
