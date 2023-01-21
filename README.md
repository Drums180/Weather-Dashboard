# Weather-Dashboard
## Criteria 1: Weather Conditions
The first criterion and the main objective of this challenge is to obtain weather information using the OpenWeather server API. To do this, the fetch method is used together with the .then promise commands combined to the JSON structure to obtain the information in the form of an object as a result.

Once the data has been converted into an object, the function to obtain this API is complemented by a console.log(data) to identify the format in which the information is obtained.

```
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
```

However, the documentation of this API refers to the connection with another API from the same company with the name of Geocoding API, which manages to convert the name of a city into units of longitude and latitude, units that work as variables to obtain the temperature. in the initial API.

In this way, both complement each other and therefore it is necessary to execute the function to call the Geocoding API first and it already interprets the information put in the text input by the user, reflects it and obtains the temperature of the desired place.

![geocoding](https://user-images.githubusercontent.com/118247139/213890473-d8d41e13-1dc8-4117-90aa-8e3fb3ef1b95.png)
> ###### Note: The use of different console.log() over the function are mainly use with the purpouse of debuging and accesing the data sent by the server.

## Criteria 2: Search History
To save previous searches performed on the website, Local Storage is used in conjunction with JSON.parse to save the information already used in the browser of the local device.

In addition to this, the .index() function is used to search within the array in Local Storage if there is an element with the same name so as not to create a duplicate.

To display these elements, another function is used that uses a for loop to display each one in the form of a p below the browser bar.

Additionally, for the future you should consider adding a maximum of elements to the array saved in Local Storage as well as a button to clear the search history.

![save](https://user-images.githubusercontent.com/118247139/213890549-1d70c51f-812b-4a4a-ad37-fd5c991c86ed.png)

## Criteria 3: 5 day forecast

For the last criteria, the Day.js API is also used which returns the dates in the desired format. This is because the Weather Forecast API returns the date with hour, minute and second, so it should be converted to a string and then modified to meet the criteria.

That is why it was decided to use another API and at the same time use reasoning to change the day both in Day.js and in OpenWeather.

For Day.js, simply use the .add function to add a day each time the loop is run. While for the OpenWeather information, a variable derived from i is used, which seeks to use the logic to have at least -1 day of distance between each information obtained from the server side API. This is because there are three hours difference between each array of information, so no matter what time of day it is, 8 arrays later (24/3 = 8) will give the information of the next day.

Using both logics, it is possible to provide specific information on the temperature of each day for a total of six days while all the criteria are met.

```
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
```



> Visualize the final page [here](https://drums180.github.io/Weather-Dashboard/)
