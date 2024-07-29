const apiKey = "be19cace06c7eef9f03d0f13deec5065";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
let weather_img = document.querySelector(".weather-icon");
let weather_info = document.querySelector("#weather-info");
let temp_info = document.getElementById('temp-info');
let humidity_info = document.getElementById('Humidity-info');
let windspeed_info = document.getElementById('windspeed-info');
const search = document.getElementById('search');
let note = document.getElementById('tips');

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json();
  console.log(data);
  if (response.status == 404) {
    document.getElementById('error').style.opacity = "1";
    setTimeout(() => {
      document.getElementById('error').style.opacity = "0";
      searchBox.value = "";
    }, 2000);
    document.querySelector(".weather").style.height = "20px";
    document.querySelector(".weather").style.visibility = "hidden";
  } else {
    let round_temp = Math.round(data.main.temp);
    let humidity_details = data.main.humidity;
    let wind_speed = data.wind.speed;

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = round_temp + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind-speed").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".feels-like").innerHTML = `( Feels like ${Math.round(data.main.feels_like)}°c )`;


    // Temperature feedback
    if (round_temp >= 35) {
      temp_info.innerHTML = "( Above normal )";
      temp_info.style.color = "red";
    } else if (round_temp > 10 && round_temp < 35) {
      temp_info.innerHTML = "( Normal )";
      temp_info.style.color = "#03C03C";
    } else if (round_temp <= 10) {
      temp_info.innerHTML = "( Below normal )";
      temp_info.style.color = "aqua";
    }

    // Humidity feedback
    if (humidity_details >= 80) {
      humidity_info.innerHTML = "( High )";
      humidity_info.style.color = "red";
    } else if (humidity_details >= 30 && humidity_details < 80) {
      humidity_info.innerHTML = "( Normal )";
      humidity_info.style.color = "#03C03C";
    } else if (humidity_details < 30) {
      humidity_info.innerHTML = "( Low )";
      humidity_info.style.color = "aqua";
    }

    // Wind speed feedback
    if (wind_speed >= 30) {
      windspeed_info.innerHTML = "( High )";
      windspeed_info.style.color = "red";
    } else if (wind_speed >= 0 && wind_speed < 30) {
      windspeed_info.innerHTML = "( Normal )";
      windspeed_info.style.color = "#03C03C";
    }

    // Specific weather conditions
    if (data.weather[0].main == 'Clear') {
      weather_img.src = "images/clear.png";
      weather_info.innerHTML = "Clear: No issues, continue with normal activities.";
      weather_info.style.color = "#03C03C";
    } else if (data.weather[0].main == 'Clouds') {
      weather_img.src = "images/clouds.png";
      weather_info.innerHTML = "Overcast: Monitor the weather forecast for potential changes, but normal activities can continue.";
      weather_info.style.color = "#03C03C";
    } else if (data.weather[0].main == 'Drizzle') {
      weather_img.src = "images/drizzle.png";
      weather_info.innerHTML = "Drizzle: Small amount of drizzle is beneficial for crops. Ensure that fields have proper drainage to avoid waterlogging if drizzle persists.";
      weather_info.style.color = "orange";
    } else if (data.weather[0].main == 'Rain') {
      weather_img.src = "images/rain.png";
      weather_info.innerHTML = "Rain: If this is unexpected, prepare for waterlogging. Ensure proper drainage in fields and protect young or delicate plants.";
      weather_info.style.color = "aqua";
    } else if (data.weather[0].main == 'Mist') {
      weather_img.src = "images/mist.png";
      weather_info.innerHTML = "Mist: Monitor crops for potential fungal growth due to increased moisture. Ensure proper ventilation in greenhouses and polyhouses.";
      weather_info.style.color = "orange";
    } else if (data.weather[0].main == 'Snow') {
      weather_img.src = "images/snow.png";
      weather_info.innerHTML = " Snow:Protect sensitive crops with frost cloths or row covers. Ensure livestock has adequate shelter and warmth.";
      weather_info.style.color = "red";
    }
    else if (data.weather[0].main == 'Haze') {
      weather_img.src = "images/haze.png";
      weather_info.innerHTML = "Haze: Limit outdoor activities and ensure proper respiratory protection due to poor air quality.";
      weather_info.style.color = "aqua";

    }

    // Specific notes for farmers and crops based on conditions
    if (data.weather[0].main === 'Rain') {
      note.innerHTML =
        "1. Ensure proper drainage for crops.<br>" +
        "2. Protect young plants.<br>" +
        "3. Avoid waterlogging.<br>" +
        "4. Monitor weather updates.<br>" +
        "5. Delay any outdoor chemical applications.";
    } else if (round_temp >= 35 && humidity_details >= 80) {
      note.innerHTML =
        "1. Stay hydrated and take frequent breaks.<br>" +
        "2. Monitor crops for heat stress and fungal growth.<br>" +
        "3. Ensure proper irrigation for crops.<br>" +
        "4. Use mulch to retain soil moisture.<br>" +
        "5. Avoid outdoor work during peak heat.";
    } else if (round_temp >= 35 && humidity_details < 30) {
      note.innerHTML =
        "1. Ensure crops are well-watered.<br>" +
        "2. Use mulch to retain soil moisture.<br>" +
        "3. Avoid over-fertilization during high heat.<br>" +
        "4. Provide shade for sensitive plants.<br>" +
        "5. Wear light clothing and stay hydrated.";
    } else if (round_temp <= 10 && humidity_details >= 80) {
      note.innerHTML =
        "1. Dress warmly and monitor for frostbite.<br>" +
        "2. Watch for fungal growth on crops.<br>" +
        "3. Ensure good air circulation for crops.<br>" +
        "4. Protect crops from frost.<br>" +
        "5. Be cautious of slippery conditions.";
    } else if (round_temp <= 10 && (humidity_details < 30 || (humidity_details >= 30 && humidity_details < 80))) {
      note.innerHTML =
        "1. Dress warmly and protect extremities.<br>" +
        "2. Monitor crops for frost damage.<br>" +
        "3. Use frost cloths to protect crops.<br>" +
        "4. Ensure proper hydration for crops.<br>" +
        "5. Stay indoors when possible.";
    } else if (wind_speed >= 30) {
      note.innerHTML =
        "1. Secure loose items around the farm.<br>" +
        "2. Protect crops from wind damage.<br>" +
        "3. Use windbreaks to reduce wind impact.<br>" +
        "4. Monitor for soil erosion.<br>" +
        "5. Avoid outdoor work during high winds.";
    } else if (humidity_details >= 80) {
      note.innerHTML =
        "1. Watch for fungal growth on crops.<br>" +
        "2. Ensure proper ventilation in storage areas.<br>" +
        "3. Monitor for pests that thrive in high humidity.<br>" +
        "4. Keep equipment dry to prevent rust.<br>" +
        "5. Be cautious of slippery conditions.";
    } else if (round_temp >= 35) {
      note.innerHTML =
        "1. Stay hydrated and take frequent breaks.<br>" +
        "2. Provide shade for sensitive crops.<br>" +
        "3. Ensure crops are well-watered.<br>" +
        "4. Use mulch to retain soil moisture.<br>" +
        "5. Avoid outdoor work during peak heat.";
    } else {
      note.innerHTML =
        "1. Continue with normal farming activities.<br>" +
        "2. Monitor weather updates for any changes.<br>" +
        "3. Ensure proper hydration for crops.<br>" +
        "4. Maintain good farm practices.<br>" +
        "5. Keep an eye on equipment and livestock.";
    }

    const w = document.querySelector('.weather');
    w.style.visibility = "visible";
    w.style.height = "auto";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
})

searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter")
    checkWeather(searchBox.value);
})



