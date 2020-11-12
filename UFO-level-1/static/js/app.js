// from data.js
var tableData = data;

// YOUR CODE HERE!

// get the button handler

d3.select("#filter-btn").on("click", function() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input element and get the value
  var inputValue = d3.select("#datetime").node().value;

  console.log(inputValue)

  validationMsg = ValidateDate(inputValue);

  // if date validation is not successful then print the error message and exit the event handler
  if (validationMsg != "success")
  {
     d3.select("#DateInvalid").text(validationMsg)
     return;
  }
  else
  {
    d3.select("#DateInvalid").text("")
  }

  // the date format in data may be different from the date entered by user. 
  //so making the input date and the ufosightings date in same format
  inputDate = new Date(inputValue)

  // filter the data based on the input
  ufoSightings = tableData.filter(function(ufo) {
       return new Date(ufo.datetime).toString("mm/dd/yyyy") === inputDate.toString("mm/dd/yyyy")       
    
    });

  console.log(ufoSightings)


  BuildTable(ufoSightings)



})


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

    dateFormat = /^([0]?[1-9]|[1][0-2])\/([0]?[1-9]|[1|2][0-9]|[3][0|1])\/([0-9]{4})$/

    // if the input does not match the date format, it returns false
    if (!dateStr.trim().match(dateFormat))
    {    
        return "date format invalid!!" ;
    }

    // check if the date is valid
    

    return "success";

}

function BuildTable (ufoSightings)
{
   

  var table = d3.select("#ufo-table");
  var tbody = table.select("tbody");
  tbody.selectAll("tr").remove()
  var trow;
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