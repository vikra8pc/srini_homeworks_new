// from data.js
var tableData = data;
console.log(tableData)
// YOUR CODE HERE!

var UniqueCountries =tableData.map(country => country.country).filter((v, i, a) => a.indexOf(v) === i);
var UniqueStates =tableData.map(state => state.state).filter((v, i, a) => a.indexOf(v) === i);  
console.log(UniqueCountries)
console.log(UniqueStates)
var tbody = d3.select("tbody");



function fnAllData(){
tableData.forEach((item) => {
    var row = tbody.append("tr");
    Object.entries(item).forEach(([key, value]) => {
      var cell = tbody.append("td");
      cell.text(value);
    });
  })
};
fnAllData();

  var submit = d3.select("#filter-btn");

  submit.on("click", function() {
  
    // Prevent the page from refreshing
    d3.event.preventDefault();
  
    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");
  
    // Get the value property of the input element
    var inputValue = inputElement.property("value");
  
    console.log(inputValue);
    console.log(tableData);
if (inputValue){
var filteredData = tableData.filter(row => row.datetime === inputValue);


var body = document.querySelector('tbody');
while (body.firstChild) {
// This will remove all children within tbody which in your case are <tr> elements
body.removeChild(body.firstChild);
}
console.log(filteredData);
filteredData.forEach((item) => {
    var row = tbody.append("tr");
    Object.entries(item).forEach(([key, value]) => {
        var cell = tbody.append("td");
        cell.text(value);
    });

    });
}
else{
    var body = document.querySelector('tbody');
    while (body.firstChild) {
    // This will remove all children within tbody which in your case are <tr> elements
    body.removeChild(body.firstChild);
    }    
    fnAllData()
}

});