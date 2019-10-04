$(document).ready(function() {
    console.log("project");

console.log("project");
let eventfulKey = `fWBHtdbcHkhq4Lcr`

// let queryUrl = `https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/categories/list?app_key=${eventfulKey}`
let queryUrl = `https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?app_key=${eventfulKey}&location=Phoenix&sort_order=popularity&date=This Week`;

// &category=outdoor

// &category=music&location=$citta&sort_order=popularity
// `http://api.eventful.com/json/events/search?app_key=${eventfulKey}&category=music`

$.ajax(
    {
        url: queryUrl,
        method: "GET"
    }
    ).then(
        function(response) {
            console.log(JSON.parse(response))  
        },
        function(error) {
            console.log(error)
        }
    );


    
        var cityCountry = "Los Angeles,us";
    
        var APIKey = "bc835c03fbfeab5d3660a9a497ae24d0";
    
        var queryWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?" +
        "q=" + cityCountry +"&units=imperial&appid=" + APIKey;
    
      


        
        $.ajax({
            url: queryWeatherURL,
            method: "GET"
    
        })
    
        .then(function (response) {
             console.log(queryWeatherURL);
    
             console.log(response);
             
             console.log(response.list[28].main.temp);
    
             console.log(response.list[28].dt_txt);
    
             console.log(response.list[28].weather[0].description);
    
            
    
             console.log(response.city.name);
    
             
        })
    })
    
    