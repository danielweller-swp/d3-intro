// Description: This file contains the code to display a bar plot in the left column of the webpage.

function displayBarPlot(selectedEmployee) {
    console.log("Displaying bar plot")

    // Load data from CSV and build bar plot
    loadData().then(data => {
        // Remove old bar plot(s)
        d3.selectAll("#barPlot").remove();
        // Best practice here would be to introduce an "enter exit update loop" -> but more complex

        // Store values for svg creation
        var parent = d3.select("#left_column");
        const width = parent.node().clientWidth - 100;
        const height = width * 0.6;  // make plot height always 60% of the width

        // Define padding around the svg
        var padding = {top: 10, right: 20, bottom: 75, left: 70};

        // Create SVG container
        var svg = d3.select("#left_column")
            .append("svg")
            .attr("id", "barPlot")
            .attr("width", width)
            .attr("height", height);

        // Scale for x-axis
        var xScale = d3.scaleBand()
            .domain(data.map(d => d.employee))
            .range([padding.left, width - padding.right])
            .padding(0.2);  // control space between bars

        // Scale for y-axis
        var yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.peelSkill)])
            .nice()
            .range([height - padding.bottom, padding.top]);

        // Create axes
        var xAxis = d3.axisBottom(xScale);
        var yAxis = d3.axisLeft(yScale);

        // Add x-axis
        svg.append("g")
            .attr("transform", "translate(0," + (height - padding.bottom) + ")")
            .call(xAxis)
            .selectAll("text") // Select all the text elements for styling
                .attr("transform", "rotate(-45)")
                .attr("text-anchor", "end")
                .attr("dx", "-0.6em")
                .attr("dy", "0.5em")
                .style("font-size", "12px");

        // Add y-axis
        svg.append("g")
            .attr("transform", "translate(" + padding.left + ",0)")
            .call(yAxis)
            .selectAll("text") // Select all text elements in the axis
                .style("font-size", "12px");

        // Create and append bars
        svg.selectAll(".bar")
            .data(data)
            .enter()
                .append("rect")
                .attr("fill", d => d.employee === selectedEmployee ? "orange" : "#1F7A8C")
                .attr("x", d => xScale(d.employee))
                .attr("y", d => yScale(d.peelSkill))
                .attr("width", xScale.bandwidth())
                .attr("height", d => height - padding.bottom - yScale(d.peelSkill))
                // ADDING INTERACTIVITY
                .on("click", clickToggle)
                .on("mouseover", hoverOn)
                .on("mouseout", hoverOff);

        // Interactivity functions
        function hoverOn(event, d) {
            d3.select(this)
                .transition().duration(50)
                .attr("fill", "orange");

            displayScatterPlot(d.employee)
        }

        function hoverOff(event, d) {
            d3.select(this)
                .transition().duration(300)
                .attr("fill", "#1F7A8C");

            displayScatterPlot()
        }

        function clickToggle(event, d) {
            // Do something on click
        }


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
