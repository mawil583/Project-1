console.log("project");
let eventfulKey = `fWBHtdbcHkhq4Lcr`

let queryUrl = `https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?...&app_key=${eventfulKey}&category=music&location=Phoenix`
// &category=music&location=$citta&sort_order=popularity
// `http://api.eventful.com/json/events/search?app_key=${eventfulKey}&category=music`

$.ajax(
    {
        url: queryUrl,
        method: "GET"
    }
    ).then(
        function(response) {
            console.log(response)
        },
        function(error) {
            console.log(error)
        }
    );