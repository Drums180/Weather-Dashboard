# Weather-Dashboard
## Criteria 1: Weather Conditions
The first criteria that is asked to improve the performance of the work day planner is the current date. To achieve this, it is necessary to use an external API that sees this information through JavaScript and so that it can use the jQuery API (or using vanilla JavaScript is also possible) to insert this text directly into the HTML.

The API used is the same as seen during the course, that is, Day.js which, through the `dayjs()` function, gives us today's date. In addition to this, a function is used within JavaScript to determine the ordinal ending of the number, however, this will be discussed later.

![currentDate](https://user-images.githubusercontent.com/118247139/211972502-b61e6af3-a34d-4418-bac3-993b35956395.png)
> ###### Note: The use of different console.log() over the function are mainly use with the purpouse of following the track of what the user wants and what it doesn´t for its password.

## Criteria 2: Search History
The second criterion is the change of background color according to the schedule. For this we continue to use the Day.js API to now get the current time by using the `format(“H”)` command and adding this to the `today` variable previously set to today, this allows the API to access to the current time and pass it to JavaScript.

Once this is done, it is necessary to obtain the time corresponding to the various time blocks, for this the id of each one is used since they contain the corresponding time at the end. In order to obtain them, the substring command is used, which allows taking the first or last characters of a string and, in this case, adding them to a new variable.

With this, a for loop is used together with a function that compares the hours of each block of time with the current time and depending on the result, an already established class is assigned that will format the block. In order for it to be constantly updated and there is no error when the classes accumulate, all the corresponding classes (if there are any) are eliminated before starting the function to determine the class to add.

```
function changeStyle() {
    var divs = $(".time-block");
    for (var i = 0; i < divs.length; i++) {
      var idOfBlock = divs[i].id;
      var hourOfBlock = idOfBlock.substring(idOfBlock.length-2);
      console.log(hourOfBlock) //Checking for bugs
      console.log(actualHour) //Checking for bugs
      $("#hour-" + hourOfBlock).removeClass("past");
      $("#hour-" + hourOfBlock).removeClass("present");
      $("#hour-" + hourOfBlock).removeClass("future");

      if (hourOfBlock < actualHour) {
        $("#hour-" + hourOfBlock).addClass("past");
        console.log("past")
      } else if (hourOfBlock == actualHour) {
        $("#hour-" + hourOfBlock).addClass("present");
        console.log("present")
      } else if (hourOfBlock > actualHour) {
        $("#hour-" + hourOfBlock).addClass("future");
        console.log("future")
      }
  }
  }
  changeStyle()
```
![Captura de pantalla 2023-01-11 a la(s) 21 52 24](https://user-images.githubusercontent.com/118247139/211971785-e4e1c728-e51b-4a10-a2fa-ff0ab585181c.png)

## Criteria 3: 5 day forecast

## Add Ups
This add-up was mentioned earlier and is related to a JavaScript function that allows you to identify the ordinal ending and add it as a string to the Current Date text. Even though the Dayjs documentation shows the use of a plug-in called “Advanced Formats” to be able to use this notation you need to make your own function, it was impossible for me to introduce this plug-in in the code so I decided to do it myself.

Since the only different endings are those of the first three numbers, the function identifies if the current day corresponds to any of these first three and if the ending th is not used, it is universal for all numbers other than 1, 2 or 3.

```
function determineOrdinal(){
    if (today.format("D") == 1) {
      ordinal = "st";
    } else if (today.format("D") == 2) {
      ordinal = "nd";
    } else if (today.format("D") == 3) {
      ordinal = "rd";
    } else {
      ordinal = "th";
    }
  }
  determineOrdinal();
```

Another add-up is the clear button to reset the values in the LocalStorage as well as delete the values directly in the inputs.

Firstly the button was created in Html using a default bootstrap configuration, while giving it a custom margin using direct css.

For its functionality, jQuery was used to select the button, add an EventListener on click to activate the function presented below.

This function uses a for loop to reset each of the values in the LocalStorage in addition to removing the current value in the time blocks. The syntax is very similar to other functions since a combination of several previously used techniques was used, such as selecting the blocks using `divs` and then using the `i` to access each one individually, as well as using the id of these, the corresponding LocalStorage section was directly accessed and the value was eliminated if there was one previously existing.

![html_clear](https://user-images.githubusercontent.com/118247139/212109056-102560ce-92ef-482d-a0c0-1b25a7752d3d.png)
```
function clearLS() {
    var divs = $(".time-block");
    for (var i = 0; i < divs.length; i++) {
      var containerId = divs[i].id;
      localStorage.removeItem(containerId);
      var container = divs[i];
      $(container).children(".description").val("")
    }
  }
  ```

> Visualize the final page [here](https://drums180.github.io/Weather-Dashboard/)
