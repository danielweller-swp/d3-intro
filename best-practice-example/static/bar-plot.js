// Description: This file contains the code to display a bar plot in the left column of the webpage.

function displayBarPlot() {
    console.log("Displaying bar plot")

    // Remove old bar plot(s)
    d3.selectAll("#barPlot").remove();

    // Load data from CSV and build bar plot
    d3.csv("static/data/data.csv", d => ({
            employee: d.employee,
            coffeeConsumption: +d.coffee_consumption,
            flamingoEnthusiasm: +d.flamingo_enthusiasm,
            peelSkill: +d.peel_skill
        })
    ).then(data => {

        // Store values for svg creation
        var parent = d3.select("#left_column");
        const width = parent.node().clientWidth - 40;
        const height = width * 0.6;  // make plot height always 60% of the width

        // Define padding around the svg
        var padding = {top: 10, right: 20, bottom: 60, left: 55};

        // Create SVG container
        var svg = d3.select("#left_column")
            .append("svg")
            .attr("id", "barPlot")
            .attr("width", width)
            .attr("height", height);

        // Define scales
        var xScale = d3.scaleBand()
            .domain(data.map(d => d.employee))
            .range([padding.left, width - padding.right])
            .padding(0.1);

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.peelSkill)])
            .nice()
            .range([height - padding.bottom, padding.top]);

        // Create and append axes
        var xAxis = d3.axisBottom(xScale);
        var yAxis = d3.axisLeft(yScale);

        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + (height - padding.bottom) + ")")
            .call(xAxis)
            .selectAll("text") // Select all the text elements for styling
            .attr("transform", "rotate(-45)")
            .attr("text-anchor", "end")
            .attr("dx", "-0.6em")
            .attr("dy", "0.5em");

        svg.append("g")
            .attr("class", "y-axis")
            .attr("transform", "translate(" + padding.left + ",0)")
            .call(yAxis);

        // Create and append bars
        svg.selectAll(".bar")
            .data(data)
            .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("x", d => xScale(d.employee))
                .attr("y", d => yScale(d.peelSkill))
                .attr("width", xScale.bandwidth())
                .attr("height", d => height - padding.bottom - yScale(d.peelSkill))
                .attr("fill", "steelblue");

        // Add a y-axis label
        svg.append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("x", -(height - padding.top - padding.bottom)/2 - padding.top)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("📝 Post-it Peel Skill Level");
    });
}
