const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weatherImg = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const weatherCard = document.querySelector('.weather-card');

// 🔁 Replace this with your actual API key
const apiKey = "bd840730865357b3e9522614eca4822f";

async function checkWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      alert(data.message);
      return;
    }

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

  } catch (error) {
    console.error("Error fetching weather:", error);
    alert("Something went wrong.");
  }
}

searchBtn.addEventListener('click', () => {
  const city = inputBox.value.trim();
  if (city !== '') {
    checkWeather(city);
  }
});

// 🌙 Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeToggle.textContent = document.body.classList.contains('dark-mode') 
    ? '☀️ Light Mode' 
    : '🌙 Dark Mode';
});
