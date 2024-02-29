// fetchWeather is the eventlistener (onclick)
async function fetchWeather() {
  let searchInput = document.getElementById("search").value;
  const weatherDataSection = document.getElementById("weather-data");
  weatherDataSection.style.display = "flex";
  /* Uncomment this line once you have entered the value for your own apikey
  const apiKey = ; */

  // In case no input is searched
  if (searchInput == "") {
    weatherDataSection.innerHTML = `
    <div>
    <h2>Empty Input!</h2>
    <p>Please try again with a valid <u>city name</u>.</p>
    </div>
    `;
    return;
  }
  // Function to get longitude and latitude based on the name (city) provided
  async function getLonAndLat() {
    const countryCode = 1;
    geocodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput.replace(
      " ",
      "%20"
    )},${countryCode}&limit=1&appid=${apiKey}`;
    const response = await fetch(geocodeURL);

    // If the response is not 200 or good
    if (!response.ok) {
      console.log("Bad response! ", response.status);
      return;
    }
    const data = await response.json();
    // If empty data is returned
    if (data.length == 0) {
      console.log("Something went wrong here.");
      weatherDataSection.innerHTML = `
        <div>
        <h2>Invalid Input: "${searchInput}"</h2>
        <p>Please try again with a valid <u>city name</u>.</p>
        </div>
        `;
      return;
    } else {
      return data[0];
    }
  }

  // Function to provide weather information using API wherein longitude and latitude is provided as input
  async function getWeatherData(lon, lat) {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const response = await fetch(weatherURL);

    // If the response is not 200 or good
    if (!response.ok) {
      console.log("Bad response! ", response.status);
      return;
    }

    const data = await response.json();
    weatherDataSection.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${
      data.weather[0].icon
    }.png" alt="${data.weather[0].description}" width="100" />
    <div>
    <h2>${data.name}</h2>
    <p><strong>Temperature:</strong> ${Math.round(
      data.main.temp - 273.15
    )}&deg;C</p>
    <p><strong>Description:</strong> ${data.weather[0].description}</p>
    </div>
    `;
  }
  // To revert the textbox to empty
  document.getElementById("search").value = " ";
  // To provide output
  const geocodeData = await getLonAndLat();
  getWeatherData(geocodeData.lon, geocodeData.lat);
}
