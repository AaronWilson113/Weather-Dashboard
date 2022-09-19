// Defining Variables from Html Elements
var apiKey = "35b4263be3c8fb07e61b756e7b5c6337"
var submitButton = document.getElementById("button");
var input = document.getElementById("userInput");
var firstCard = document.getElementById("data-container");
var secondCard = document.getElementById("weather-container");
var firstCardInfo = document.getElementById("info");
var secondCard1stInfo = document.getElementById("card1");
var secondCard2ndInfo = document.getElementById("card2");
var secondCard3rdInfo = document.getElementById("card3");
var secondCard4thInfo = document.getElementById("card4");
var secondCard5thInfo = document.getElementById("card5");
var firstCardDate = document.getElementById("firstCard")
var secondCardDate1 = document.getElementById("blah")
// Defining Variables for first api call using user input
var apiv1 = "http://api.openweathermap.org/geo/1.0/direct?q=";
var apiv2 = "&limit=5&appid=35b4263be3c8fb07e61b756e7b5c6337";

// Defining Variables for second api call 
var weatherApiv1 = "https://api.openweathermap.org/data/2.5/onecall?lat=";
var weatherApiv2 = "&lon=";
var weatherApiv3 = "&appid=35b4263be3c8fb07e61b756e7b5c6337";

// Addeventlistener for button on page
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
        secondCard1stInfo.innerHTML = ""
        

        console.log(data)
        //creating elements and then appending data to the page for current weather
        getDate();
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
        function getWeekly(card) {

            var ftemp = document.createElement("p");
            var fwind = document.createElement("p");
            var fhumidity = document.createElement("p");
        
            
            ftemp.textContent = "Temp: " + data.daily[i].temp.day;
            fwind.textContent = "Wind: " + data.daily[i].wind_speed + "MPH";
            fhumidity.textContent = "Humidity: " + data.daily[i].humidity + "%";
        
            
            card.appendChild(ftemp);
            card.appendChild(fwind);
            card.appendChild(fhumidity);
        
        }

        for (var i=0; i <5; i++){
            console.log(data.daily[0].temp.day)

            switch(i) {
                case 0:
                    getWeekly(secondCard1stInfo);
                    break;
                case 1:
                    getWeekly(secondCard2ndInfo);
                    break;
                case 2: 
                    getWeekly(secondCard3rdInfo);
                    break;
                case 3:
                    getWeekly(secondCard4thInfo);
                    break;
                case 4:
                    getWeekly(secondCard5thInfo);

            }
           
        }
    })

}

function getDate () {
    

    var fdate = document.createElement("h1");
    var firstdate = document.createElement("h1");
    var sdate = document.createElement("h1");
    var tdate = document.createElement("h1");
    var fourDate = document.createElement("h1");
    var fiveDate = document.createElement("h1");

    fdate.textContent = moment().format('YYYY-MM-DD');
    firstdate.textContent = moment().format('YYYY-MM-DD');
    
    firstCard.append(fdate);
    secondCard1stInfo.append(sdate);
    
    
    fdate.style.fontSize = "14px";
    fdate.style.marginLeft = "15px";
    fdate.style.color = "black";
    firstdate.style.color = "black";
    console.log(fdate);

    
}

