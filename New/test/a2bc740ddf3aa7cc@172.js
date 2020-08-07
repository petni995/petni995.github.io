// https://observablehq.com/@d3/drag-zoom@172
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Drag & Zoom

You can combine d3.drag and d3.zoom to allow dragging within a zoomable container. If you click and drag on the background, the view pans; if you click and drag on a circle, it moves.`
)});
  main.variable(observer("chart")).define("chart", ["d3","width","height","data","radius"], function(d3,width,height,data,radius)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  const g = svg.append("g")
      .attr("cursor", "grab");

  g.selectAll("circle")
    .data(data)
    .join("circle")
      .attr("cx", ({x}) => x)
      .attr("cy", ({y}) => y)
      .attr("r", radius)
      .attr("fill", (d, i) => d3.interpolateRainbow(i / 360))
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

  svg.call(d3.zoom()
      .extent([[0, 0], [width, height]])
      .scaleExtent([1, 8])
      .on("zoom", zoomed));

  function dragstarted() {
    d3.select(this).raise();
    g.attr("cursor", "grabbing");
  }

  function dragged(d) {
    d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
  }

  function dragended() {
    g.attr("cursor", "grab");
  }

  function zoomed() {
    g.attr("transform", d3.event.transform);
  }

  return svg.node();
}
);
  main.variable(observer("height")).define("height", function(){return(
500
)});
  main.variable(observer("radius")).define("radius", function(){return(
6
)});
  main.variable(observer("step")).define("step", ["radius"], function(radius){return(
radius * 2
)});
  main.variable(observer("data")).define("data", ["step","theta","width","height"], function(step,theta,width,height){return(
Array.from({length: 2000}, (_, i) => {
  const radius = step * Math.sqrt(i += 0.5), a = theta * i;
  return {
    x: width / 2 + radius * Math.cos(a),
    y: height / 2 + radius * Math.sin(a)
  };
})
)});
  main.variable(observer("theta")).define("theta", function(){return(
Math.PI * (3 - Math.sqrt(5))
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
  return main;
}
