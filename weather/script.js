const outputTemp = document.getElementById("outputTemp");
const weatherOutput = document.getElementById("weatherOutput");

fetch('http://api.openweathermap.org/data/2.5/weather?q=Jakobstad&appid=6d94ae8d87b74829c97d37d4f5d45bb7&units=metric')
  .then(response => response.json())
  .then(data => getData(data))




function getData(data) {
    console.log(data)
    outputTemp.innerHTML = `${data.main.temp}&#730;C`

    
    if(data.weather[0].main == "Clouds") {
        document.body.style.backgroundImage= "url('cloudy.jpg')";
        document.body.style.backgroundPosition = "center";
        weatherOutput.innerHTML += `Det är molnigt.`;
    }
    else if (data.weather[0].main == "Rain") {
        document.body.style.backgroundImage= "url('rain.jpg')";
        document.body.style.backgroundPosition = "center";
        weatherOutput.innerHTML += `Det regnar.`
    }
    else if (data.weather[0].main == "Snow") {
        document.body.style.backgroundImage= "url('snow.jpg')";
        document.body.style.backgroundPosition = "center";
        weatherOutput.innerHTML += `Det snöar.`
    }
    else {
        document.body.style.backgroundImage= "url('sunny.jpg')";
        document.body.style.backgroundPosition = "center";
        weatherOutput.innerHTML += `Det är soligt.`;
    }
}
