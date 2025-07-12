const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weatherImg = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const weatherCard = document.querySelector('.weather-card');
const errorMsg = document.getElementById('error-msg');

const apiKey = "bd840730865357b3e9522614eca4822f"; // Replace with your API key

async function checkWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.status === 404 || data.cod === "404") {
      weatherCard.classList.add('show');
      weatherImg.src = "404.png";
      temperature.innerHTML = `--<sup>°C</sup>`;
      description.innerText = "Not Found";
      humidity.innerText = "--%";
      windSpeed.innerText = "--Km/H";
      errorMsg.style.display = "block";
      errorMsg.innerText = "City not found. Please enter a valid name.";
      return;
    }

    // Valid city
    temperature.innerHTML = `${Math.round(data.main.temp)}<sup>°C</sup>`;
    description.innerText = data.weather[0].main;
    humidity.innerText = `${data.main.humidity}%`;
    windSpeed.innerText = `${data.wind.speed}Km/H`;

    const weatherCondition = data.weather[0].main.toLowerCase();

    if (weatherCondition.includes("cloud")) {
      weatherImg.src = "cloud.png";
    } else if (weatherCondition.includes("rain")) {
      weatherImg.src = "rain.png";
    } else if (weatherCondition.includes("clear")) {
      weatherImg.src = "clear.png";
    } else {
      weatherImg.src = "default.png";
    }

    weatherCard.classList.add('show');
    errorMsg.style.display = "none";

  } catch (error) {
    console.error("Fetch error:", error);
    weatherCard.classList.add('show');
    weatherImg.src = "error.png";
    temperature.innerHTML = `--<sup>°C</sup>`;
    description.innerText = "Error";
    humidity.innerText = "--%";
    windSpeed.innerText = "--Km/H";
    errorMsg.style.display = "block";
    errorMsg.innerText = "Something went wrong. Try again later.";
  }
}

searchBtn.addEventListener('click', () => {
  const city = inputBox.value.trim();
  if (city !== '') {
    checkWeather(city);
  }
});

// 🌙 Theme toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeToggle.textContent = document.body.classList.contains('dark-mode') 
    ? '☀️ Light Mode' 
    : '🌙 Dark Mode';
});
   

    

