// Defining Variables from Html Elements
var apiKey = "35b4263be3c8fb07e61b756e7b5c6337"
var submitButton = document.getElementById("button");
var input = document.getElementById("userInput")
var firstCard = document.getElementById("data-container")
var secondCard = document.getElementById("weather-container");

// Defining Variables for first api call using user input
var apiv1 = "http://api.openweathermap.org/geo/1.0/direct?q=";
var apiv2 = "&limit=5&appid=35b4263be3c8fb07e61b756e7b5c6337";

// Defining Variables for second api call 
var weatherApiv1 = "https://api.openweathermap.org/data/2.5/onecall?lat=";
var weatherApiv2 = "&lon=";
var weatherApiv3 = "&appid=35b4263be3c8fb07e61b756e7b5c6337";

submitButton.addEventListener("click" , function(){

    var requestString = apiv1 + input.value + apiv2

    fetch(requestString)
     .then (function (response){
        return response.json();
        
    })
    .then(function (data){
        console.log(data)
        console.log(data[0].lat)
        console.log(data[0].lon)
        var latCord = data[0].lat;
        var lonCord = data[0].lon;

        localStorage.setItem('latCord' , JSON.stringify(latCord));
        localStorage.setItem('lonCord' , JSON.stringify(lonCord));
        
        secondApiCall(lonCord, latCord)
    });
    
})

 // Api Call for weather data. Passed variables in function
 function secondApiCall(lonCord , latCord) {

    var requestString2 = weatherApiv1 + latCord + weatherApiv2 + lonCord + weatherApiv3;

    fetch(requestString2)
     .then (function (response){
        return response.json();
     
    })
    .then(function(data){
        firstCard.innerHTML = ""
        console.log(data)
        //creating elements and then appending data to the page for current weather
        var cityTitle = document.createElement("p");
        var temp = document.createElement("p");
        var wind = document.createElement("p");
        var humidity = document.createElement("p");
        var UVindex = document.createElement("p");

        cityTitle.textContent = input.value
        temp.textContent = "Temp: " + data.current.temp
        wind.textContent = "Wind: " + data.current.wind_speed + "MPH"
        humidity.textContent = "Humidity: " + data.current.humidity + "%"
        UVindex.textContent = "Uv Index: " + data.current.uvi

        firstCard.appendChild(cityTitle);
        firstCard.appendChild(temp);
        firstCard.appendChild(wind);
        firstCard.appendChild(humidity);
        firstCard.appendChild(UVindex);
        
        //creating elements and then appending data to the page for future weather
        for (var i=0; i <5; i++){
            console.log(data.daily[i].temp.day)

            var ftemp = document.createElement("p");
            var fwind = document.createElement("p");
            var fhumidity = document.createElement("p");

            ftemp.textContent = data.daily[i].temp.day;
            fwind.textContent = data.daily[i].wind;
            fhumidity.textContent = data.daily[i].humidity;

            secondCard.appendChild(ftemp);
            secondCard.appendChild(fwind);
            secondCard.appendChild(fhumidity);
        }
    })

}

