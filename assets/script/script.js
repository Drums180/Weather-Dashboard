$(function () {

    // DOM VARIABLES
    var searchBtn = $("#searchBtn");
    var savedCities = $("#savedCities");


    // GEOCODING API VARIABLES 
    var lat;
    var lon;
    var inputCity;

    // FORECASTING API VARIABLES 
    var todayTitle = $("#todayTitle")

    // FUNCTION TO CALL AND USE GEOCODING API 
    function getApiGeocoding() {
        // TODO: Add comment in order to explain
        inputCity = $("#searchText").val();
        console.log(inputCity)

        // fetch request gets a list of all the repos for the node.js organization
        var requestUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + inputCity + "&limit=" + 1 + "&appid=6597030ea98688b08543f5fe62ef6b3e";
      
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
        
        var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=6597030ea98688b08543f5fe62ef6b3e";
      
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

            var cards = $("article");
            console.log(cards)
            var dayOfWeek = firstDay;

            //TODO: MAIN CARD
            // Select title elements
            var mainCard = $("#mainCard")
            var symbol = $(mainCard).children("img");
            var temp = $(mainCard).children("#temp");
            var wind = $(mainCard).children("#wind");
            var humidity = $(mainCard).children("#humidity");

            var icon = data.list[0].weather[0].icon;
            var kelvin = (data.list[0].main.temp);
            var celsius = kelvin - 273.15;
            var mph = (data.list[0].main.temp);
            var hum = (data.list[0].wind.speed);

            todayTitle.text(cityName + firstDay.format(' MMM D, YYYY'))
            symbol.attr("src", "https://openweathermap.org/img/w/" + icon + ".png");
            temp.text("Temperature: " + celsius.toFixed(2) + " °C");
            wind.text("Temperature: " + mph.toFixed(2) + " MPH");
            humidity.text("Temperature: " + hum.toFixed(2) + " %");
            
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
                console.log(dayOfWeek) //checking for bugs

                // MATHEMATICAL OPERATION IN ORDER TO HAVE DATA A DAY APPART
                var x = (i + 1) * 8 - 1
                console.log(x) //checking for bugs

                // Variable selection inside data 
                var icon = data.list[x].weather[0].icon;
                var kelvin = (data.list[x].main.temp);
                var celsius = kelvin - 273.15;
                var mph = (data.list[x].main.temp);
                var hum = (data.list[x].wind.speed);

                // Information displayed
                console.log(icon)
                symbol.attr("src", "https://openweathermap.org/img/w/" + icon + ".png");
                temp.text("Temperature: " + celsius.toFixed(2) + " °C");
                wind.text("Temperature: " + mph.toFixed(2) + " MPH");
                humidity.text("Temperature: " + hum.toFixed(2) + " %");
            }

            saveSearch()
        });
    }

    // TODO: FUNCTION TO SAVE CITY INPUT
    var citiesSearched = JSON.parse(localStorage.getItem("citiesSearched")) || [];
      
    function saveSearch() {
      if (citiesSearched.indexOf(inputCity) === -1) {
        citiesSearched.push(inputCity);
      } else {
        console.log("Duplicate value found.");
      }

      localStorage.setItem("citiesSearched", JSON.stringify(citiesSearched));
    }

    // TODO: FUNCTION TO CALL SAVED CITY INPUTS
    function savedSearch() {
      var citiesSearched = localStorage.getItem("citiesSearched");
      citiesSearched = JSON.parse(citiesSearched);
      console.log(citiesSearched); //checking for bugs

      for (var i = 0; i < citiesSearched.length; i++) {
        var cityX = citiesSearched[i];
        console.log(cityX) //checking for bugs

        var p = document.createElement("p");
        p.textContent = cityX ;

        savedCities.append(p);
      }
    }
    

    // TODO: FUNCTION TRIGGERED AT CLICK 
    function startSearch() {
        console.log("function worked"); //check for bugs
        getApiGeocoding();
    }
    

    // EVENT LISTENERS
    searchBtn.on("click", startSearch);

    savedCities.on("click", "p", function() {
      inputCity = $(this).text();
      $("#searchText").val(inputCity);
      getApiGeocoding();
  });

    savedSearch()

});
