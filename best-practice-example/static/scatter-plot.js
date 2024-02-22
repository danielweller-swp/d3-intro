// Load data from CSV
function displayScatterPlot() {
    console.log("Displaying scatter plot")

    // Remove old scatter plot(s)
    d3.selectAll("#scatterPlot").remove();

    // Load data from CSV and build scatter plot
    d3.text("static/data/scatter_data.csv").then(data => {
        // Parse data to array of numbers
        var parsedData = d3.csvParseRows(data, d => [+d[0], +d[1]]);

        // Store values for svg creation
        const parent = d3.select("#right_column")
        const width = parent._groups[0][0]["clientWidth"];
        const height = parent._groups[0][0]["clientHeight"] + 50;

        // Define padding
        var padding = {top: 20, right: 20, bottom: 10, left: 10};

        // Append SVG
        var svg = parent.append("svg")
            .attr("id", "scatterPlot")
            .attr("width", width)
            .attr("height", height);


        // X and Y scales
        var x = d3.scaleLinear()
            .domain(d3.extent(parsedData, d => d[0]))  // returns list [min, max] of provided data
            .range([padding.left, width - padding.right]);

        var y = d3.scaleLinear()
            .domain(d3.extent(parsedData, d => d[1]))
            .range([height - padding.bottom, padding.top]);  // Note that the "origin" is defined as the upper left corner, thus we need to invert the range
            // TODO check if works!

        // X axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .append("text")
            .attr("class", "label")
            .attr("x", width)
            .attr("y", -6)
            .style("text-anchor", "end")
            .text("Coffee Consumption");

        // Y axis
        svg.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Flamingo Enthusiasm");

        // Create circles for each data point
        svg.selectAll(".dot")
            .data(parsedData)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", d => x(d[0]))
            .attr("cy", d => y(d[1]))
            .attr("r", 2);
    });
}