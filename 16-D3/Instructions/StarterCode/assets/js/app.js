// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("./assets/data/data.csv")
  .then(function(healthData) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    healthData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
    });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([8, d3.max(healthData, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([4, d3.max(healthData, d => d.healthcare)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "8")
    .attr("fill", "red")
    .attr("opacity", ".75") ;

    /* Create the text for each block */
//     var circlesGroup = chartGroup.selectAll("texts")
//     .data(healthData)
//     .enter()
//     .append("text")
//   .text(function(d) {
//     return d.abbr
//   })
//   .attr("dx", d => xLinearScale(d.poverty))
//   .attr("dy", d => (yLinearScale(d.healthcare)+20)/2.5)
//   .attr({
//     "text-anchor": "middle",
//     "font-size": "20"
//   });
chartGroup.append("text")
.style("text-anchor", "middle")
.style("font-size", "8px")
.style("font-weight", "bold")
.style("font-family", "arial")
.selectAll("tspan")
.data(healthData)
.enter()
.append("tspan")
    .attr("x", function(data) {
        return xLinearScale(data.poverty - 0);
    })
    .attr("y", function(data) {
        return yLinearScale(data.healthcare - 0.1);
    })
    .text(function(data) {
        return data.abbr
});

    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`State: ${d.state}<br>In Povery(%): ${d.poverty}<br>Lacks Healthcare(%): ${d.healthcare}`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare(%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text( `In Povery(%)`);
  });
//   circlesGroup.on("click", function() {
//     d3.select(this)
//               .transition()
//               .duration(500)
//               .attr("fill", "white");
//   })
//       .on("mouseout", function() {
//         d3.select(this)
//               .transition()
//               .duration(500)
//               .attr("fill", "red");
//       });