// from data.js
var tableData = data;

// YOUR CODE HERE!

// get the button handler

d3.select("#filter-btn").on("click", function() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input element and get the raw HTML node
  var inputValue = d3.select("#datetime").node().value;


})