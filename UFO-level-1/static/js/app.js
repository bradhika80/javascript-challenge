// from data.js
var tableData = data;

// YOUR CODE HERE!

// initial table set up with default date
BuildTable("1/1/2010")

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
 
  // call the build table function
  BuildTable(inputValue)
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

   // remove the placeholder to avoid confusion after the initial load
   d3.select("#datetime").node().placeholder = ''

}


// a function to validate the date input
function ValidateDate(dateStr)
{
    // checks if the date input is empty
    if (dateStr === null || dateStr.trim() === '')
    {       
        return "input value empty!!";  
    }

    // reference (regex) :- https://www.codegrepper.com/code-examples/delphi/how+to+validate+input+date+js
    dateFormat = /^([0]?[1-9]|[1][0-2])\/([0]?[1-9]|[1|2][0-9]|[3][0|1])\/([0-9]{4})$/

    // if the input does not match the date format, it returns false
    if (!dateStr.trim().match(dateFormat))
    {    
        return "date format invalid!!" ;
    }
   
    return "success";
}

// A function to filter the ufo sightings based on input date value and print them in the table
function BuildTable (inputValue)
{

  // the date format in data may be different from the date entered by user. 
  //so making the input date and the ufosightings date in same format
  inputDate = new Date(inputValue)

  // filter the data based on the input
  ufoSightings = tableData.filter(function(ufo) {
    return new Date(ufo.datetime).toString("mm/dd/yyyy") === inputDate.toString("mm/dd/yyyy")       
 
 });

 // build the table - get the table object and body
  var table = d3.select("#ufo-table");
  var tbody = table.select("tbody");

  // create a table row variable
  var trow;

  // if no ufo sightings then put the message not available
  if (ufoSightings.length == 0)
  {
    msg = `No Ufo sightings recorded for the date: ${inputValue}`
    d3.select("#QueryResult").text(msg)
  }
  else
  {
    d3.select("#QueryResult").text("UFO Sightings")
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