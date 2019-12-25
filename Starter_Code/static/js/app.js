// Create a function to build the charts
function buildchart(sample){
    d3.json("samples.json").then((data) => {

        // Set variables for later use
        var samples = data.samples;    
        var resultArray = samples.filter(sampleObj => sampleObj.id == sample);    
        var result = resultArray[0];
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        // Set plotly data object
        var data = [{
            type: "bar",
            orientation: "h",
            x: otu_ids.slice(0, 10),
            y: sample_values.slice(0, 10),
            text:otu_labels.slice(0,10)}];
        
        // Set the layout object
        var layout1 = {
            title: 'Microbe Data for Subject',
            showlegend: false,
            height: 400,
            width: 500
        };    

        // Create Plotly chart
        Plotly.newPlot("bar", data, layout1);
    
        // Create the bubble chart. 
        // Create trace object
        var trace1 = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            text: otu_labels,
            marker: {
              color: otu_ids,
              size: sample_values,
              opacity: [1, 0.8, 0.6, 0.4],
              size: [40, 60, 80, 100]
          }
        };
        
        // Set bubble_data array to put into plotly
        var bubble_data = [trace1];

        //create the layout object
        var layout = {
            title: 'Bubble chart for Microbe Data',
            showlegend: false,
            height: 600,
            width: 1200
        };
        
        // Create plotly chart
        Plotly.newPlot('bubble', bubble_data, layout);
    })
}
// Create function to display the data in a table
function buildmetadatadisplay(sample){
    d3.json("samples.json").then((data) => {

        // Set variables
        var metadata = data.metadata;    
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);    
        var result = resultArray[0];
        var sample_metadata = d3.select("#sample-metadata");
        sample_metadata.html("");

        // Loop through each object to get key, value pairs and display them on the webpage
        Object.entries(result).forEach(([key,value]) => {
            sample_metadata.append("h6").text(key+" : "+ value)
        })
    })
}
// Update charts upon new selection
function dropdownupdate(sample){
    d3.json("samples.json").then((data) => {
        var selDataset = d3.select("#selDataset")
        var names = data.names
        names.forEach((name) => {
            selDataset.append("option").text(name).property("value", name)
        })
        var subject = names[0]
        buildchart(subject) 
        buildmetadatadisplay(subject)
    })
}
//option change function 
function optionChanged(sample){
        buildchart(sample) 
        buildmetadatadisplay(sample)
}
// dropdown update
dropdownupdate()
