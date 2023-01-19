// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

    // DOM VARIABLES
    var searchBtn = $("#searchBtn")

    // GEOCODING API VARIABLES 
    var lat;
    var lon;

    // FORECASTING API VARIABLES 
    var todayTitle = $("#todayTitle")
    var lat;
    var lon;

    // FUNCTION TO CALL AND USE GEOCODING API 
    function getApiGeocoding() {
        // TODO: Add comment in order to explain
        var inputCity = $("#searchText").val();
        console.log(inputCity)

        // fetch request gets a list of all the repos for the node.js organization
        var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + inputCity + "&limit=" + 1 + "&appid=6597030ea98688b08543f5fe62ef6b3e";
      
        fetch(requestUrl)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data); //checking for bugs
            
            lat = data[0].lat;
            console.log(lat); //checking for bugs
            lon = data[0].lon;
            console.log(lon); //checking for bugs

            // Once the values for latitud and longitud are described, the forecast 
            // Api is activated inside this function 
            getApiForecast()
          });
    }

    // TODO: FUNCTION TO CALL AND USE FORECAST API 
    function getApiForecast() {
        // fetch request gets a list of all the repos for the node.js organization
        
        var requestUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=6597030ea98688b08543f5fe62ef6b3e";
      
        fetch(requestUrl)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data)

            var cityName = data.city.name;
            var today = dayjs();
            var firstDay = today.add(9, "hour")
            console.log(cityName) //check for bugs

            //MAIN CARD
            todayTitle.text(cityName + firstDay.format(' MMM D, YYYY'))

            var cards = $("#next5day").children("article");
            console.log(cards)
            var dayOfWeek = firstDay;

            cards[0].text(dayOfWeek.format('MMM D, YYYY'))
            for (var i = 0; i < cards.length; i++) {
                console.log("loop is working")
                // Select title elements / dates using dayjs
                var container = cards[i];
                var date = $(container).children("h5");
                var symbol = $(container).children("img");
                var temp = $(container).children("#temp");
                var wind = $(container).children("#wind");
                var humidity = $(container).children("#humidity");

                dayOfWeek = dayOfWeek.add(1, "day")
                date.text(dayOfWeek.format('MMM D, YYYY'))
                console.log(dayOfWeek)
            }
        });
    }

    // TODO: FUNCTION TRIGGERED AT CLICK 
    function startSearch() {
        console.log("function worked"); //check for bugs
        getApiGeocoding();
    }

    // EVENT LISTENER FOR SEARCH BUTTON THAT RUNS CORRESPONDING FUNCTIONS 
    searchBtn.on("click", startSearch);

});
