function misPalabras(){
 let phrases = ["Chase your dreams, not the money",
    "Embrace every challenge",
    "Create, don't wait",
    "Rise above the storm to find the sunshine",
    "Be fearless in pursuit of what sets your soul on fire",
    "Turn obstacles into opportunities",
    "Stay hungry for success",
    "Let your passion be your guide",
    "Dream big, work hard",
    "Keep pushing, keep striving",
    "Make today your masterpiece",
    "Seek progress, not perfection",
    "Be your own hero",
    "Turn your can'ts into cans",
    "Find beauty in the journey",
    "Elevate your mindset",
    "Ignite your inner spark",
    "Define your own success",
    "Leave a trail of greatness"]
    
    let randomIndex = Math.floor(Math.random() * phrases.length)
    let motivationalWishes = document.querySelector("#wishes");
    motivationalWishes.innerHTML= phrases[randomIndex];
}
let now = new Date();
let date = now.getDate(); 
let months = ["January", "February", "March", "April", "May","June", "July", "August", "September", "October", "November",  "December"];
let month = months[now.getMonth()];
let year = now.getFullYear();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", ];
let day =days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
    hours = '0' + hours; 
}
let minutes = now.getMinutes();
if (minutes < 10) {
    minutes = '0' + minutes; 
}
let name = document.querySelector(`.time-container`);
name.innerHTML= ` <div class="dayOfTheMonth">${date}</div>
                  <div class="currentMonth">${month}</div>
                  <div class="currentYear">${year}</div>
                  <div class="dayOfTheWeek">${day}</div>
                  <div class="currentTime">${hours}:${minutes}</div>`; 
    
                function showTemperature(response){
                    let temperature = Math.round(response.data.temperature.current);
                    let city = response.data.city;
                    let descriptionElement = document.querySelector("#description");
                    let humidityElement= document.querySelector("#humidity");
                    let windSpeedElement= document.querySelector("#wind-speed");
                    let iconElement= document.querySelector("#icon");
                    document.querySelector("#myCity").innerHTML = city;
                    document.querySelector("#temp").innerHTML = `&nbsp${temperature}°C`;
                    descriptionElement.innerHTML=(response.data.condition.description);
                    humidityElement.innerHTML=`${Math.round(response.data.temperature.humidity)}%&nbsp`;
                    windSpeedElement.innerHTML=`${(response.data.wind.speed)}km/h`;
                    iconElement.innerHTML=`<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
                    getForecast(response.data.city);
                }
                
function getWeather(city) {
    let apiKey = 'b7c63f07c3aa3tf911f32df107994d0o';
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
}

function getForecast(city){
    let apiKey= 'b7c63f07c3aa3tf911f32df107994d0o';
    let apiUrl= `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`
    axios.get(apiUrl).then(showForecast);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#search-for-me");
    getWeather(cityInputElement.value);
    misPalabras();
}
let form = document.querySelector("#request-city-form");
form.addEventListener("submit", handleSubmit);

getWeather("Cunit");
misPalabras();

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    return days[date.getDay()];
  }

function showForecast(response){
    let forecastHtml="";

    response.data.daily.forEach(function(day, index) {
        if(index<6){
        forecastHtml= 
        forecastHtml+
        `
        <div class="forecast">
      <div class="row">
        <div class="col-2">
          <div class="info-date-temp">
          <div class="forecast-date">${formatDay(day.time)}</div>
          <img src="${day.condition.icon_url}"class="weather-forecast-icon"/>
          <div class="forecast-temp">
          <span class=" temp-max">${Math.round(day.temperature.maximum)}°</span><span class="temp-min">${Math.round(
            day.temperature.minimum
          )}°</span>
        </div>
        </div>
      </div>
    </div>
        `;
    }
    });
    let forecastElement = document.querySelector(".forecast");
    forecastElement.innerHTML = forecastHtml;
}
showForecast();
