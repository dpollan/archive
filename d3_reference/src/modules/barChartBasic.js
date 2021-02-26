//Global variables

const _canvasWidth = 800;
const _canvasHeight = 800;

//Create the svg file on the svg canvas

var svg = d3.select('#canvas')
  .append('svg')
    .attr('width', _canvasWidth)
    .attr('height', _canvasHeight);

//Build the graph

