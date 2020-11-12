// from data.js
var tableData = data;

// YOUR CODE HERE!

PopulateAllOptions();

// initial table set up with default date
BuildTable("1/11/2011", "all", "all", "all", "all");

// get the button handler and create the handler function for the click event
d3.select("#filter-btn").on("click", function() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

  ResetPageDefaults();

  // Select the input element and get the value
  var inputValue = d3.select("#datetime").node().value;

  //console.log(inputValue)

  // validate the input date string and get the validationResult
  validationResult = ValidateDate(inputValue);

  // if date validationResult is not success then print the error message and exit the event handler
  if (validationResult != "success")
  {
    d3.select("#DateInvalid").text(validationResult)
    return;
  }


  // get the city from selection list
  var citySelection = d3.select("#selCity");
  // Assign the value of the dropdown menu option to a variable
  var cityName = citySelection.property("value");
  // if no input is recieved, default behavior is used
  if (cityName.trim() == '')
  {
    cityName = "all"
  }

  // get the state from selection list
  var stateSelection = d3.select("#selState");
  // Assign the value of the dropdown menu option to a variable
  var stateName = stateSelection.property("value");
  // if no input is recieved, default behavior is used
  if (stateName.trim() == '')
  {
    stateName = "all"
  }

  // get the country from selection list
  var countrySelection = d3.select("#selCountry");
  // Assign the value of the dropdown menu option to a variable
  var countryName = countrySelection.property("value");
  // if no input is recieved, default behavior is used
  if (countryName.trim() == '')
  {
    countryName = "all"
  }


  // get the shape from selection list
  var shapeSelection = d3.select("#selShape");
  // Assign the value of the dropdown menu option to a variable
  var shapeName = shapeSelection.property("value");
  // if no input is recieved, default behavior is used
  if (shapeName.trim() == '')
  {
    shapeName = "all"
  }
  
  // call the build table function
  BuildTable(inputValue, cityName, stateName, countryName, shapeName)
})

// a function to reset the page elements without refreshing the page
function ResetPageDefaults()
{
  // reset the Query Result html element
  d3.select("#QueryResult").text("")

  // reset the date invalid message html element
  d3.select("#DateInvalid").text("")

  // get the table object and body
  var table = d3.select("#ufo-table");
  var tbody = table.select("tbody");
 
  //remove if any existing rows in the table
   tbody.selectAll("tr").remove()

}


// a function to validate the date input
function ValidateDate(dateStr)
{
    // checks if the date input is empty
    if (dateStr === null || dateStr.trim() === '')
    {       
        return "input value empty!!";  
    }

    // regex expression for the date format
    //dateFormat = /(0\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1])\/(19|20)\d{2}/
    //dateFormat = /(0\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1])\/\d{4}/

    // reference (regex) :- https://www.codegrepper.com/code-examples/delphi/how+to+validate+input+date+js
    dateFormat = /^([0]?[1-9]|[1][0-2])\/([0]?[1-9]|[1|2][0-9]|[3][0|1])\/([0-9]{4})$/

    // if the input does not match the date format, it returns false
    if (!dateStr.trim().match(dateFormat))
    {    
        return "date format invalid!!" ;
    }

   
    return "success";

}

// A function to filter the ufo sightings based on input parameters and print them in the table
function BuildTable (inputValue, cityName, stateName,countryName, shapeName )
{

  // the date format in data may be different from the date entered by user. 
  //so making the input date and the ufosightings date in same format
  inputDate = new Date(inputValue)

  // filter the data based on the input
  ufoSightings = tableData.filter(function(ufo) {
      if ((new Date(ufo.datetime).toString("mm/dd/yyyy") === inputDate.toString("mm/dd/yyyy") )
         && (cityName === "all" || cityName === ufo.city))
         {
            return true;

         }
         else
         {
             return false;
         }

          
 
 });

 // build the table - get the table object and body
  var table = d3.select("#ufo-table");
  var tbody = table.select("tbody");

  // create a table row variable
  var trow;

  if (ufoSightings.length == 0)
  {
    msg = `No Ufo sightings recorded for the date: ${inputValue}`
    d3.select("#QueryResult").text(msg)
  }

  // iterate through the dataset and add the data to the table
  ufoSightings.forEach(function(ufo) {
    trow = tbody.append("tr");
    trow.append("td").text(ufo.datetime);
    trow.append("td").text(ufo.city);
    trow.append("td").text(ufo.state);
    trow.append("td").text(ufo.country);
    trow.append("td").text(ufo.shape);
    trow.append("td").text(ufo.durationMinutes);
    trow.append("td").text(ufo.comments);
  });
    
}

//function to populate all options
function PopulateAllOptions()
{
    PopulateCityOption();
    PopulateStateOption();
    PopulateCountryOption();
    PopulateShapeOption();
}

//function to prepopulate city list
function PopulateCityOption(){

    // use map function to get the cities. Use keys() to get the unique values. Sort them in ascending order
    var cityList = (d3.map(data, function(d){return(d.city)}).keys()).sort(d3.ascending);
    
    // Add a default value
    //Ref :- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    cityList.splice(0, 0, 'all');

    //populate the options
    var options = d3.select("#selCity")
                    .selectAll('option')
                    .data(cityList).enter()
                    .append('option')
                    .text(function (d) { return d; });
    

}

//function to prepopulate state list
function PopulateStateOption(){

    // use map function to get the states. Use keys() to get the unique values. Sort them in ascending order
    var stateList = (d3.map(data, function(d){return(d.state)}).keys()).sort(d3.ascending);
    
    // Add a default value
    //Ref :- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    stateList.splice(0, 0, 'all');

    //populate the options
    var options = d3.select("#selState")
                    .selectAll('option')
                    .data(stateList).enter()
                    .append('option')
                    .text(function (d) { return d; });
    

}

//function to prepopulate country list
function PopulateCountryOption(){

    // use map function to get the country. Use keys() to get the unique values. Sort them in ascending order
    var countryList = (d3.map(data, function(d){return(d.country)}).keys()).sort(d3.ascending);
     
    // Add a default value
    //Ref :- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    countryList.splice(0, 0, 'all');

    //populate the options
    var options = d3.select("#selCountry")
                    .selectAll('option')
                    .data(countryList).enter()
                    .append('option')
                    .text(function (d) { return d; });
    

}


//function to prepopulate shape list
function PopulateShapeOption(){

    // use map function to get the shape. Use keys() to get the unique values. Sort them in ascending order
    var shapeList = (d3.map(data, function(d){return(d.shape)}).keys()).sort(d3.ascending);
   
    // Add a default value
    //Ref :- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    shapeList.splice(0, 0, 'all');

    //populate the options
    var options = d3.select("#selShape")
                    .selectAll('option')
                    .data(shapeList).enter()
                    .append('option')
                    .text(function (d) { return d; });
    

}

