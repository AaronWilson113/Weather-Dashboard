// Defining Variables from Html Elements
var apiKey = "35b4263be3c8fb07e61b756e7b5c6337"
var submitButton = document.getElementById("button");
var input = document.getElementById("userInput")


// Defining Variables for api call using user input
var apiv1 = "http://api.openweathermap.org/geo/1.0/direct?q=";
var apiv2 = "&limit=5&appid=35b4263be3c8fb07e61b756e7b5c6337";



submitButton.addEventListener("click" , function(){

    var requestString = apiv1 + input.value + apiv2

    fetch(requestString)
     .then (function (response){
        return response.json();
        
    })
    .then(function (data){
        console.log(data)
    })

})




