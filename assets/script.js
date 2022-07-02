// Defining Variables from Html Elements
var apiKey = "35b4263be3c8fb07e61b756e7b5c6337"
var submitButton = document.getElementById("button");



// Add Event listener for submit button on webpage
function returnText(){
    
    var cityName = document.getElementById("userInput").value;
    
    window.localStorage.setItem(cityName, JSON.stringify(cityName));

};
