// Function to get weather information based on the city entered
async function getWeather() {
    const city = document.getElementById('city').value.trim();
    if (!city) return;
  
    const apiKey = 'ae4de709edc5aa1a04f478fbf0f9524e'; // OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      // If the city is not found, show error message
      if (data.cod === '404') {
        document.getElementById('weather-result').classList.add('hidden');
        alert('City not found');
      } else {
        document.getElementById('weather-result').classList.remove('hidden');
        document.getElementById('city-name').innerText = `${data.name}, ${data.sys.country}`;
        document.getElementById('temperature').innerText = `${data.main.temp}°C`;
        document.getElementById('description').innerText = data.weather[0].description;
  
        const iconCode = data.weather[0].icon;
        document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${iconCode}.png`;
  
        const lastUpdatedTime = new Date().toLocaleString();
        document.getElementById('last-updated').innerText = `Last updated: ${lastUpdatedTime}`;
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
  
  // Autocomplete city search functionality
  async function getSuggestions(query) {
    const suggestionsList = document.getElementById('suggestions');
    suggestionsList.innerHTML = ''; // Clear previous suggestions
  
    if (!query) {
      suggestionsList.style.display = 'none'; // Hide suggestions if query is empty
      return;
    }
  
    const apiKey = 'ae4de709edc5aa1a04f478fbf0f9524e'; // OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/find?q=${query}&type=like&cnt=5&appid=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.list.length > 0) {
        suggestionsList.style.display = 'block'; // Show suggestions list
        data.list.forEach(city => {
          const li = document.createElement('li');
          li.innerText = city.name;
          li.onclick = function () {
            document.getElementById('city').value = city.name;
            suggestionsList.style.display = 'none'; // Hide suggestions list
            getWeather(); // Fetch weather data for the selected city
          };
          suggestionsList.appendChild(li);
        });
      } else {
        suggestionsList.style.display = 'none'; // Hide suggestions if no results found
      }
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
    }
  }
  