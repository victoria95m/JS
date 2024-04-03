
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
                    humidityElement.innerHTML=`${Math.round(response.data.temperature.humidity)} %`;
                    windSpeedElement.innerHTML=`${(response.data.wind.speed)}km/h`;
                    
                    iconElement.innerHTML=`<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
                }
                

function getWeather(city) {
    let apiKey = 'b7c63f07c3aa3tf911f32df107994d0o';
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
}


function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#search-for-me");
    getWeather(cityInputElement.value);

}


let form = document.querySelector("#request-city-form");
form.addEventListener("submit", handleSubmit);

getWeather("Cunit");



function showForecast(){
    let days = [ "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
    let forecastHtml="";

    days.forEach(function(day) {
        forecastHtml= 
        forecastHtml+
        `
        <div class="forecast">
      <div class="row">
        <div class="col-2">
          <div class="info-date-temp">
          <div class="forecast-date">${day} </div>
          <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png"alt="" width="36"/>
          <div class="forecast-temp">
          <span class=" temp-max">17°</span><span class="temp-min">14°</span>
        </div>
        </div>
      </div>
    </div>
        `;
    });

    let forecastElement = document.querySelector(".forecast");
    forecastElement.innerHTML = forecastHtml;
}

showForecast();
