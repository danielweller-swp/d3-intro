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
        const height = width * 0.6;

        // Define padding
        var padding = {top: 0, right: 10, bottom: 20, left: 30};

        // Append SVG
        var svg = parent.append("svg")
            .attr("id", "scatterPlot")
            .attr("width", width)
            .attr("height", height);


        // X and Y scales
        const xMinMax = d3.extent(parsedData, d => d[0]) // returns list [min, max] of provided data
        var xScale = d3.scaleLinear()
            .domain([xMinMax[0] * 0.95, xMinMax[1] * 1.05])
            .range([padding.left, width - padding.right]);

        const yMinMax = d3.extent(parsedData, d => d[1])
        var yScale = d3.scaleLinear()
            .domain([yMinMax[0] * 0.95, yMinMax[1] * 1.05])
            .range([height - padding.bottom, padding.top]);  // Note that the "origin" is defined as the upper left corner, thus we need to invert the range

        // X axis
        svg.append("g")
            .attr("transform", "translate(0," + (height - padding.bottom) + ")")
            .call(d3.axisBottom(xScale))
            .append("text")
            .attr("class", "label")
            .attr("x", width)
            .attr("y", -6)
            .style("text-anchor", "end")
            .text("Coffee Consumption");

        // Y axis
        svg.append("g")
            .attr("transform", "translate(" + (padding.left) + ",0)")
            .call(d3.axisLeft(yScale))
            .append("text")
            .attr("class", "label")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Flamingo Enthusiasm");

        // Create circles for each data point
        svg.selectAll(".dot")
            .data(parsedData)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", d => xScale(d[0]))
            .attr("cy", d => yScale(d[1]))
            .attr("r", 2);
    });
}