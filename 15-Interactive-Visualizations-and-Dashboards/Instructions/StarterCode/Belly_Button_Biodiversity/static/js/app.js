function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
// @TODO: Complete the following function that builds the metadata panel
  // Use `d3.json` to fetch the metadata for a sample
  var url = `/metadata/${sample}`;
  d3.json(url).then(function(){

    var data = d3.select("#sample-metadata").html('');

    Object.entries(sample).forEach(function ([k, v]) {
      var row = data.append("panel-body");
      row.text(`${k}: ${v} \n`);
    });
});
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data
    
    d3.json(`/samples/${sample}`).then(function(data) {
  
      // @TODO: Build a Bubble Chart using the sample data

  
      var trace1 = {
        x: data.otu_ids,
        y: data.sample_values,
        text: data.otu_labels,
        mode: 'markers',
        marker: {color: data.otu_ids, size: data.sample_values} 
      };
    
      var data = [trace1];
  
      var layout = {
        xaxis: { title: "OTU ID"},
      };
  
  Plotly.newPlot('bubble', data, layout);
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    d3.json(url).then(function(data) {  
      var pie_values = data.sample_values.slice(0,10);
        var pie_labels = data.otu_ids.slice(0,10);
        var pie_hover = data.otu_labels.slice(0,10);
  
        var data = [{
          values: data.sample_values.slice(0,10),
          labels: data.otu_ids.slice(0,10),
          hovertext: data.otu_labels.slice(0,10),
          type: 'pie'
        }];
  
        Plotly.newPlot('pie', data);
  
  });
});
};
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
