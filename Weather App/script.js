const apiKey = "206fa786a9ba3fb6d2df8550eadf87a4";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const urlcast = "http://api.openweathermap.org/data/2.5/forecast?q=";

const searchBox = document.querySelector("#input");
const searchBtn = document.querySelector("#search");
const weatherIcon = document.querySelector("#img");
console.log(searchBox);
console.log(searchBtn);

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const response_forcast = await fetch(urlcast + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".container").style.display = "none";

    }
    if (response_forcast.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".container").style.display = "none";

    }
    else {
        var data = await response.json();
        var forcast = await response_forcast.json();
        console.log(searchBox);
        console.log(forcast);

        document.getElementById('city').innerText = data.name + ' , ' + data.sys.country;
        document.getElementById('temprature').innerText = Math.floor(data.main.temp) + '°C';
        document.getElementById('wind').innerText = data.wind.speed + ' m/s';
        document.getElementById('cloud').innerText = data.weather[0].description;

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "cloud.jpg"
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "clear.jpg"
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "rain.jpg"
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "drizzle.jpg"
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "mist.jpg"
        }
        document.querySelector('.templist').innerHTML = '';
        for(let i=0; i<5; i++) {
            var date = new Date(forcast.list[i].dt*1000);
            let hour = document.createElement('div');
            hour.setAttribute('class','next');
    
            let div = document.createElement('div');
            let time = document.createElement('p');
            time.setAttribute('class','time');
            time.innerText = (date.toLocaleTimeString(undefined,'Asia/Kolkata')).replace('.00','');
            let temp = document.createElement('p');
            temp.innerText = Math.floor(forcast.list[i].main.temp_max - 273) + '°C' + ' / ' + Math.floor(forcast.list[i].main.temp_min - 273) + '°C';
            div.appendChild(time);
            div.appendChild(temp);
    
            let description = document.createElement('p');
            description.setAttribute('class','description');
            description.innerText = forcast.list[i].weather[0].description;
            hour.appendChild(div);
            hour.appendChild(description);
    
            document.querySelector('.templist').appendChild(hour);
        }

        document.querySelector('.week').innerHTML = '';

        for(let i = 0; i < forcast.list.length; i += 10) {
            console.log(forecast.list[i]);

            let div = document.createElement('div');
            div.setAttribute('class','day');
            let day = document.createElement('p');
            day.setAttribute('class','date');
            let temp = document.createElement('p');
            temp.setAttribute('class','temp');
            let description = document.createElement('p');
            description.setAttribute('class','description');

            day.innerText = new Date(forcast.list[i].dt * 1000).toDateString(undefined,'Asia/Kolkata');
            div.appendChild(day);

            temp.innerText = Math.floor(forcast.list[i].main.temp_max - 273) + '°C' + ' / ' + Math.floor(forcast.list[i].main.temp_min - 273) + '°C';
            div.appendChild(temp);

            description.innerText = forcast.list[i].weather[0].description;
            div.appendChild(description);

            document.querySelector('.week').appendChild(div);

        }

        document.querySelector(".container").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }


}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})
checkWeather();