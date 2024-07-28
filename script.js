const apiKey = "be19cace06c7eef9f03d0f13deec5065";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
let weather_img = document.querySelector(".weather-icon");
let weather_info = document.querySelector("#weather-info");
let temp_info = document.getElementById('temp-info');
let humidity_info = document.getElementById('Humidity-info');
let windspeed_info = document.getElementById('windspeed-info');


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
    // document.querySelector(".weather").style.height = "20px";
    // document.querySelector(".weather").style.visibility = "hidden";

  }



  else {
    let round_temp = Math.round(data.main.temp);
    let humidity_details = data.main.humidity;
    let wind_speed = data.wind.speed;

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = round_temp + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind-speed").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".feels-like").innerHTML = `( Feels like ${Math.round(data.main.feels_like)}°c )`;

    if (round_temp >= 35) {
      temp_info.innerHTML = "Temperature above normal !";
      temp_info.style.color = "red";
    }


    if (round_temp > 10 && round_temp < 35) {

      temp_info.innerHTML = "Normal temperature";
      temp_info.style.color = "green";
    }


    if (round_temp <= 10) {
      temp_info.innerHTML = "Temperature below normal";
      temp_info.style.color = "blue";
    }

    // Humidity feedback
    if (humidity_details >= 80) {
      humidity_info.innerHTML = "High humidity";
      humidity_info.style.color = "red";
    } if (humidity_details >= 30 && humidity_details < 80) {
      humidity_info.innerHTML = "Normal humidity";
      humidity_info.style.color = "green";
    } if (humidity_details < 30) {
      humidity_info.innerHTML = "Low humidity";
      humidity_info.style.color = "blue";
    }

    // Wind speed feedback
    if (wind_speed >= 30) {
      windspeed_info.innerHTML = "High wind speed";
      windspeed_info.style.color = "red";
    } if (wind_speed >= 0 && wind_speed < 30) {
      windspeed_info.innerHTML = "Normal wind speed";
      windspeed_info.style.color = "green";
    }

    if (data.weather[0].main == 'Clear') {
      weather_img.src = "images/clear.png";
      weather_info.innerHTML = "Clear: No issues, continue with normal activities.";
      weather_info.style.color = "green";
    }


    else if (data.weather[0].main == 'Clouds') {
      weather_img.src = "images/clouds.png";
      weather_info.innerHTML = "Overcast: Monitor the weather forecast for potential changes, but normal activities can continue.";
      weather_info.style.color = "green";
    }

    else if (data.weather[0].main == 'Drizzle') {
      weather_img.src = "images/drizzle.png";
      weather_info.innerHTML = "Drizzle: Small amount of drizzle is beneficial for crops.Ensure that fields have proper drainage to avoid waterlogging if drizzle persists.";
      weather.style.color = "orange";
    }

    else if (data.weather[0].main == 'Rain') {
      weather_img.src = "images/rain.png";
      weather_info.innerHTML = "Rain: If this is unexpected, prepare for waterlogging. Ensure proper drainage in fields and protect young or delicate plants.";
      weather_info.style.color = "blue";

    }

    else if (data.weather[0].main == 'Mist') {
      weather_img.src = "images/mist.png";
      weather_info.innerHTML = "Monitor crops for potential fungal growth due to increased moisture. Ensure proper ventilation in greenhouses and polyhouses.";
      weather_info.style.color = "orange";
    }

    else if (data.weather[0].main == 'Snow') {
      weather_img.src = "images/snow.png";
      weather_info.innerHTML = "Mist: Protect sensitive crops with frost cloths or row covers. Ensure livestock has adequate shelter and warmth.";
      weather_info.style.color = "red";
    }

    const w = document.querySelector('.weather');
    w.style.visibility = "visible";




  }

}


searchBtn.addEventListener("click", (() => {
  checkWeather(searchBox.value);
}));


