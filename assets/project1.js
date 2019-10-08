$(document).ready(function () {
    // global variables
    var eventfulKey = `fWBHtdbcHkhq4Lcr`;
    var weatherKey = "bc835c03fbfeab5d3660a9a497ae24d0";
    var city = "";
    let mainTemp = '';
    let cloudiness = '';
    let weatherDateTimeArr;
    let weatherTime;
    let weatherDate;
    let weatherDateTimeStr;
    let formattedWeatherDateTime;
    let solveCorsError = 'https://cors-anywhere.herokuapp.com/'
    let lat;
    let lon;


    // function declarations
    function eventfulCall() {

        let queryUrl = `${solveCorsError}http://api.eventful.com/json/events/search?app_key=${eventfulKey}&location=${city}&sort_order=popularity&date=this week`;
        // let queryUrl = `https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/categories/list?app_key=${eventfulKey}`;
        $.ajax(
            {
                url: queryUrl,
                method: "GET"
            }
        ).then(
            function (responseUnformatted) {
                console.log(responseUnformatted);
                console.log(JSON.parse(responseUnformatted));
                let response = JSON.parse(responseUnformatted);
                console.log(response);
                for (let i = 0; i < response.events.event.length; i++) {

                    let eventTitle = response.events.event[i].title;
                    let eventVenue = response.events.event[i].venue_name;
                    let eventAddress = response.events.event[i].venue_address;
                    let eventDateTimeStr = response.events.event[i].start_time;
                    let formattedEventDateTime = moment(eventDateTimeStr).format('LLLL');

                    let eventDateTimeArr = response.events.event[i].start_time.split(" ");
                    let eventDate = moment(eventDateTimeArr[0]).format('dddd, MMMM Do YYYY');
                    let eventTime = moment(eventDateTimeArr[1], 'HH:mm:ss').format('h:mm A');
                    let eventImageWithLocalPath = response.events.event[i].image.medium.url;
                    let webPath = "https:";
                    let eventImage = webPath + eventImageWithLocalPath;
                    console.log(eventImage);
                    console.log(typeof(eventImage));
                    

                    // This is for table data
                    let tRow = $("<tr>");

                    console.log(formattedWeatherDateTime);
                    console.log(formattedEventDateTime);

                    // if weather API response occurs before the ev

                    if (formattedWeatherDateTime < formattedEventDateTime) {
                        console.log(`${formattedWeatherDateTime} is less than ${formattedEventDateTime}`)
                    }

                    let tData = $(
                        "<td>" + eventTitle + "</td>" +
                        "<td>" + eventVenue + "</td>" +
                        "<td>" + eventAddress + "</td>" +
                        "<td>" + eventDate + "</td>" +
                        "<td>" + eventTime + "</td>" +
                        "<td>" + `${cloudiness}, Temp(F) = ${mainTemp}` + "</td>");
                    $(tRow).append(tData);
                    $("tbody").append(tRow);

                    // This is for card data
                    let cData = $(
                        '<div class="card" style="width: 18rem;"><img class="card-img-top" src="' + eventImage + '" alt="Card Image"><div class="card-body">' +
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
  



// Code starts executing on this button click
    $(document).on("click", ".btn", function (event) {

        event.preventDefault();
        // nicole working here to add the loader function
        



        city = $("#inlineFormInput").val();
        // weatherCall();
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
        


        function opencageCall() {
            let opencageKey = 'c78f665164ae437d8b8cc39081f7e3ff';
            city = 'tempe';
            // let stateAbv = 'az'
            let opencageUrl = `https://api.opencagedata.com/geocode/v1/json?q=${city}%2C%20usa&key=${opencageKey}&language=en&pretty=1`;
            $.ajax({
                url: opencageUrl,
                method: "GET"
                
            })
                .then(function(response) {
                    console.log(response);
                    lat = response.results[0].geometry.lat;
                    lon = response.results[0].geometry.lng;
                    console.log(lat);
                    console.log(lon);
                    
                    
                })
        };
        // opencageCall();

        function darkskyCall() {
            let darkskyKey = "9f1107bdae4244be0aadbf24108d9771";
            let darkskyUrl = `${solveCorsError}https://api.darksky.net/forecast/${darkskyKey}/33.4255056,-111.9400125`;

            $.ajax({
                url: darkskyUrl,
                method: "GET"
                
            })
                .then(function(response) {
                    console.log(response);
                    let darkskyTime0 = response.hourly.data[0].time;
                    let darkskyTime1 = response.hourly.data[1].time;
                    console.log(`the first response is at ${moment.unix(darkskyTime0).format('LLLL')}`);
                    console.log(`the first response is at ${moment.unix(darkskyTime1).format('LLLL')}`);
                    
                })


        }
        darkskyCall();

    //     function accuweatherCall() {

    //         // testing 2nd weatherAPI
    //         let accuweatherApiKey = 'r5S2eubCKbMSdum0JfBpghJAfN5dJcTb';
    //         var accuweatherQueryURL = `http://dataservice.accuweather.com/locations/v1/phoenix,az?apikey=${accuweatherApiKey}&language=en-us&details=true`;
    //     $.ajax({
    //         url: accuweatherQueryURL,
    //         method: "GET"
            
    //     })
    //         .then(function (response) {
    //             console.log(response);
    //             console.log(response.list);

                
    //             console.log(response.list[12].main.temp);
    //             mainTemp = response.list[12].main.temp

    //             weatherDateTimeArr = response.list[12].dt_txt.split(" ");
    //             weatherDate = weatherDateTimeArr[0];
    //             console.log(weatherDate);
                
    //             weatherTime = weatherDateTimeArr[1];
    //             console.log(weatherTime);

    //             weatherDateTimeStr = response.list[12].dt_txt
    //             formattedWeatherDateTime = moment(weatherDateTimeStr).format('LLLL');
                

    //             console.log(response.list[12].weather[0].description);
    //             cloudiness = response.list[12].weather[0].description;
                
                
    //             console.log(response.city.name);
    //         })
    // // end function
    //     };

        // function weatherCall() {
       

    //     var queryWeatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city},us&units=imperial&appid=${weatherKey}`;
    //     $.ajax({
    //         url: queryWeatherURL,
    //         method: "GET"

    //     })
    //         .then(function (response) {
    //             console.log(response);
    //             console.log(response.list);


    //             console.log(response.list[12].main.temp);
    //             mainTemp = response.list[12].main.temp

    //             weatherDateTimeArr = response.list[12].dt_txt.split(" ");
    //             weatherDate = weatherDateTimeArr[0];
    //             console.log(weatherDate);

    //             weatherTime = weatherDateTimeArr[1];
    //             console.log(weatherTime);

    //             weatherDateTimeStr = response.list[12].dt_txt
    //             formattedWeatherDateTime = moment(weatherDateTimeStr).format('LLLL');


    //             console.log(response.list[12].weather[0].description);
    //             cloudiness = response.list[12].weather[0].description;


    //             console.log(response.city.name);
    //         })
    // }

        })