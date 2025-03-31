const input = document.querySelector(".city-input");
const btn = document.querySelector(".search-btn");

const cityName = document.querySelector(".city");
const cityTemp = document.querySelector(".temp");
const cityHumid = document.querySelector(".humidity");
const cityWind = document.querySelector(".wind");

const weatherIcon = document.querySelector(".weather-icon");
const weatherInfo = document.querySelector(".weather-info");
const timeInfo = document.querySelector(".time-info");
async function getData(cityName){
   const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=994546c490de40fed7d8d29d8c0d0d47`);
   if(promise.status == 404){
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
}
    return await promise.json();
}
async function get_time(cityName) {
    const promise = await fetch(`https://api.weatherapi.com/v1/current.json?key=c3d598ba238f4561b0f135517252403&q=${cityName}&aqi=no`);
    return await promise.json();
}


btn.addEventListener("click",async () =>{
    const value = input.value;
    const result = await getData(value);
    const time = await get_time(value);
    console.log(result);
    cityName.innerText = result.name;
    cityTemp.innerText = `${Math.round((result.main.temp) - (273.15))}°c`;
    cityHumid.innerText = result.main.humidity + "%";
    cityWind.innerText = result.wind.speed + " Km/h";
    timeInfo.innerText = time.location.localtime;

    if(result.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png";
        weatherInfo.innerText = result.weather[0].description;
    }else if(result.weather[0].main = "Clear"){
        weatherIcon.src = "images/clear.png";
        weatherInfo.innerText = result.weather[0].description;
    }else if(result.weather[0].main = "Rain"){
        weatherIcon.src = "images/rain.png";
        weatherInfo.innerText = result.weather[0].description;
    }else if(result.weather[0].main = "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
        weatherInfo.innerText = result.weather[0].description;
    }else if(result.weather[0].main = "Mist"){
        weatherIcon.src = "images/mist.png";
        weatherInfo.innerText = result.weather[0].description;
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";

});