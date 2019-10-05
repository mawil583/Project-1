$(document).ready(function () {
    // global variables
    var eventfulKey = `fWBHtdbcHkhq4Lcr`;
    var weatherKey = "bc835c03fbfeab5d3660a9a497ae24d0";
    var city = "";
    let mainTemp = '';
    let cloudiness = '';

    // function declarations
    function eventfulCall() {

        let queryUrl = `https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?app_key=${eventfulKey}&location=${city}&sort_order=popularity&date=this week`;
        // let queryUrl = `https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/categories/list?app_key=${eventfulKey}`;
        $.ajax(
            {
                url: queryUrl,
                method: "GET"
            }
        ).then(
            function (responseUnformatted) {
                console.log(JSON.parse(responseUnformatted));
                let response = JSON.parse(responseUnformatted);
                console.log(response);
                for (let i = 0; i < response.events.event.length; i++) {

                    let eventTitle = response.events.event[i].title;
                    let eventVenue = response.events.event[i].venue_name;
                    let eventAddress = response.events.event[i].venue_address;
                    let eventDateTimeArr = response.events.event[i].start_time.split(" ");
                    let eventDate = moment(eventDateTimeArr[0]).format('dddd, MMMM Do YYYY');
                    let eventTime = moment(eventDateTimeArr[1], 'HH:mm:ss').format('h:mm A');

                    // This is for table data
                    let tRow = $("<tr>");
                    let tData = $(
                        "<td>" + eventTitle + "</td>" +
                        "<td>" + eventVenue + "</td>" +
                        "<td>" + eventDate + "</td>" +
                        "<td>" + eventTime + "</td>" +
                        "<td>" + `${cloudiness}, Temp(F) = ${mainTemp}` + "</td>");
                    $(tRow).append(tData);
                    $("tbody").append(tRow);

                    // This is for card data
                    let cData = $(
                        '<div class="card" style="width: 18rem;"><img class="card-img-top" src="assets/images/fallness.jpg" alt="Card Image"><div class="card-body">' +
                            '<h5 class="card-title event">' + eventTitle + '</h5>' +
                            '<p class="card-text date">' + eventDate + '</p></div><ul class="list-group list-group-flush">' +
                            '<li class="list-group-item venue">' + eventVenue + '</li>' +
                            '<li class="list-group-item address">' + eventAddress + '</li>' +
                            '<li class="list-group-item time">' + eventTime + '</li>' +
                            '<li class="list-group-item weather">' + `${cloudiness}, Temp(F) = ${mainTemp}` + '</li>' +
                        '</ul></div>'
                    )
                    $(".card-div").append(cData);
                }
            },
            function (error) {
                console.log(error)
            });
    };
    // eventfulCall();

    function weatherCall() {
       

        var queryWeatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city},us&units=imperial&appid=${weatherKey}`;
        $.ajax({
            url: queryWeatherURL,
            method: "GET"

        })
            .then(function (response) {
                console.log(queryWeatherURL);

                console.log(response);

                console.log(response.list[28].main.temp);
                mainTemp = response.list[28].main.temp

                console.log(response.list[28].dt_txt);

                console.log(response.list[28].weather[0].description);
                cloudiness = response.list[28].weather[0].description;

                console.log(response.city.name);
            })
    }

// Code starts executing on this button click
    $(document).on("click", ".btn", function (event) {

        event.preventDefault();
        city = $("#inlineFormInput").val();
        weatherCall();
        eventfulCall();
        console.log(city);
    })
       
    function autoFill() {

        
        var placesAutocomplete = places({
            countries: ['us'], // Search in the United States of America and in the Russian Federation
            type: 'city', // Search only for cities names
            aroundLatLngViaIP: false, // disable the extra search/boost around the source IP
          appId: 'plIL9UL82OV7',
          apiKey: '0af80e9e7ca21da5ad41e64a38158240',
          container: document.querySelector('#inlineFormInput')
          

          
        })
    };
        autoFill();

    
})