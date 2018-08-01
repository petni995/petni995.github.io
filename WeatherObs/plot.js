
function plotDualMonth(dataset, dataset2, title) {

// Define the resolution
var width = 800;
var height = 400;

// Create the SVG 'canvas'
var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width )
    .attr("height", height)

var formatTime = d3.time.format("%e %B");

// Define the padding around the graph
var padding = 60;

// Set the scales
var minDate = d3.min(dataset, function(d) { return d.x; });
// minDate.setDate(minDate.getDate() - 1);

var maxDate = d3.max(dataset, function(d) { return d.x; });

// Define the div for the tooltip
var div = d3.select("#chart").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


var xScale = d3.time.scale()
    .domain([minDate, maxDate])
    .range([padding, width - padding]);

var yScale = d3.scale.linear()
    .domain([d3.min(dataset, function(d) { return d.y; }), d3.max(dataset, function(d) { return d.y; }) + 5])
    .range([height - padding, padding]);

// x-axis
var format = d3.time.format("%d %b");
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .tickFormat(format)
    .ticks(d3.time.weeks, 1);

svg.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", "translate(0," + (height - padding) + ")")
    .call(xAxis)
    .selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(90)")
    .style("text-anchor", "start");

// y-axis
var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .tickFormat(function (d) { return d; })
    .tickSize(5, 5, 0)
    .ticks(5); // set rough # of ticks

svg.append("g")
    .attr("class", "axis y-axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);

// draw line graph
var line = d3.svg.line()
    .x(function(d) {
        return xScale(d.x);
    })
    .y(function(d) {
        return yScale(d.y);
    });

svg.append("svg:path").attr("d", line(dataset));
svg.append("svg:path").attr("d", line(dataset2));

// plot circles
svg.selectAll(".data-point")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("class", "data-point")
    .attr("cx", function(d) {
        return xScale(d.x);
    })
    .attr("cy", function(d) {
        return yScale(d.y);
    })
    .attr("r", 3)
    .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div	.html(formatTime(d.x) + "<br/>"  + d.y)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
    .on("mouseout", function(d) {
        div.transition()
            .duration(500)
            .style("opacity", 0);
    });

svg.selectAll(".data-point2")
    .data(dataset2)
    .enter()
    .append("circle")
    .attr("class", "data-point2")
    .attr("cx", function(d) {
        return xScale(d.x);
    })
    .attr("cy", function(d) {
        return yScale(d.y);
    })
    .attr("r", 3)
    .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div	.html(formatTime(d.x) + "<br/>"  + d.y)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
    .on("mouseout", function(d) {
        div.transition()
            .duration(500)
            .style("opacity", 0);
    });

svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 50 )
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text(title);

}

function plotDualMonth2(dataset, dataset2, title) {

// Define the resolution
var width = 800;
var height = 400;

// Create the SVG 'canvas'
var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width )
    .attr("height", height)


// Define the padding around the graph
var padding = 60;

// Set the scales
var minDate = d3.min(dataset, function(d) { return d.x; });
// minDate.setDate(minDate.getDate() - 1);

var maxDate = d3.max(dataset, function(d) { return d.x; });

var xScale = d3.time.scale()
    .domain([minDate, maxDate])
    .range([padding, width - padding]);

var yScale = d3.scale.linear()
    .domain([d3.min(dataset, function(d) { return d.y; }), d3.max(dataset, function(d) { return d.y; }) + 5])
    .range([height - padding, padding]);

// x-axis
var format = d3.time.format("%d %b");
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .tickFormat(format)
    .ticks(d3.time.weeks, 1);

svg.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", "translate(0," + (height - padding) + ")")
    .call(xAxis)
    .selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(90)")
    .style("text-anchor", "start");

// y-axis
var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .tickFormat(function (d) { return d; })
    .tickSize(5, 5, 0)
    .ticks(5); // set rough # of ticks

svg.append("g")
    .attr("class", "axis y-axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);

// draw line graph
var line = d3.svg.line()
    .x(function(d) {
        return xScale(d.x);
    })
    .y(function(d) {
        return yScale(d.y);
    });

svg.append("svg:path").attr("d", line(dataset));
svg.append("svg:path").attr("d", line(dataset2)).style("stroke", "red") ;


svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 50 )
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text(title);

}


function plotTriple(dataset, dataset2, dataset3, title) {

// Define the resolution
var width = 800;
var height = 400;

// Create the SVG 'canvas'
var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width )
    .attr("height", height)


// Define the padding around the graph
var padding = 60;

// Set the scales
var minDate = d3.min(dataset, function(d) { return d.x; });
// minDate.setDate(minDate.getDate() - 1);

var maxDate = d3.max(dataset3, function(d) { return d.x; });

var xScale = d3.time.scale()
    .domain([minDate, maxDate])
    .range([padding, width - padding]);

var yScale = d3.scale.linear()
    .domain([d3.min(dataset3, function(d) { return d.y; }), d3.max(dataset3, function(d) { return d.y; }) + 5])
    .range([height - padding, padding]);

// x-axis
var format = d3.time.format("%d %b");
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .tickFormat(format)
    .ticks(d3.time.days, 1);

svg.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", "translate(0," + (height - padding) + ")")
    .call(xAxis)
    .selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(90)")
    .style("text-anchor", "start");

// y-axis
var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .tickFormat(function (d) { return d; })
    .tickSize(5, 5, 0)
    .ticks(5); // set rough # of ticks

svg.append("g")
    .attr("class", "axis y-axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);

// draw line graph
var line = d3.svg.line()
    .x(function(d) {
        return xScale(d.x);
    })
    .y(function(d) {
        return yScale(d.y);
    });

svg.append("svg:path").attr("d", line(dataset));
svg.append("svg:path").attr("d", line(dataset2));
svg.append("svg:path").attr("d", line(dataset3)).style("stroke-dasharray", ("3, 3"))

// plot circles
svg.selectAll(".data-point")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("class", "data-point")
    .attr("cx", function(d) {
        return xScale(d.x);
    })
    .attr("cy", function(d) {
        return yScale(d.y);
    })
    .attr("r", 3);

svg.selectAll(".data-point2")
    .data(dataset2)
    .enter()
    .append("circle")
    .attr("class", "data-point2")
    .attr("cx", function(d) {
        return xScale(d.x);
    })
    .attr("cy", function(d) {
        return yScale(d.y);
    })
    .attr("r", 3);


svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 50 )
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text(title);

}

function plotDualMonth3(dataset, dataset2, title) {

// Define the resolution
var width = 800;
var height = 400;

// Create the SVG 'canvas'
var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width )
    .attr("height", height)


// Define the padding around the graph
var padding = 60;

// Set the scales
var minDate = d3.min(dataset, function(d) { return d.x; });
// minDate.setDate(minDate.getDate() - 1);

var maxDate = d3.max(dataset, function(d) { return d.x; });

var xScale = d3.time.scale()
    .domain([minDate, maxDate])
    .range([padding, width - padding]);

var yScale = d3.scale.linear()
    .domain([d3.min(dataset, function(d) { return d.y; }), d3.max(dataset, function(d) { return d.y; }) + 5])
    .range([height - padding, padding]);

// x-axis
var format = d3.time.format("%d %b");
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .tickFormat(format)
    .ticks(d3.time.weeks, 1);

svg.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", "translate(0," + (height - padding) + ")")
    .call(xAxis)
    .selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(90)")
    .style("text-anchor", "start");

// y-axis
var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .tickFormat(function (d) { return d; })
    .tickSize(5, 5, 0)
    .ticks(5); // set rough # of ticks

svg.append("g")
    .attr("class", "axis y-axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);


// plot circles
svg.selectAll(".data-point")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("class", "data-point")
    .attr("cx", function(d) {
        return xScale(d.x);
    })
    .attr("cy", function(d) {
        return yScale(d.y);
    })
    .attr("r", 3);

svg.selectAll(".data-point2")
    .data(dataset2)
    .enter()
    .append("circle")
    .attr("class", "data-point2")
    .attr("cx", function(d) {
        return xScale(d.x);
    })
    .attr("cy", function(d) {
        return yScale(d.y);
    })
    .attr("r", 3);

svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 50 )
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text(title);

}
