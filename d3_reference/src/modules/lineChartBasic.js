//set up the line chart

const margin = {top: 20, right: 20, bottom: 100, left: 200};
const chartWidth = 1200 - margin.left - margin.right;
const chartHeight = 600 - margin.top - margin.bottom;
const svg = d3.select('#canvas')
        .append('svg')
          .attr('width', 1200)
          .attr('height', 600);

//set background color
d3.select('body')
  .style('background-color', '#7F81B1')

const chart = svg.append('g')
  .attr('width', chartWidth)
  .attr('height', chartHeight)
  .attr('transform', `translate(${margin.left - 100}, ${margin.top})`);

const yAxisGroup = chart.append('g')
  .attr('class', "axisBreen")

const xAxisGroup = chart.append('g')
.attr('transform', `translate(0, ${chartHeight})`)
.attr('class', "axisBlue");

//generate some sample data

var data = [{"categoricalValue":"second","numericValue":87894},{"categoricalValue":"third","numericValue":159943},{"categoricalValue":"fourth","numericValue":179692},{"categoricalValue":"fifth","numericValue":94034},{"categoricalValue":"sixth","numericValue":77996},{"categoricalValue":"seventh","numericValue":89939},{"categoricalValue":"eighth","numericValue":13341},{"categoricalValue":"ninth","numericValue":15921},{"categoricalValue":"tenth","numericValue":160000}];

 //set up axis
const y = d3.scaleLinear()
  .domain([0, d3.max(data, d=>d.numericValue)])
  .range([chartHeight, 0]) // <----- remember to go from highest number to 0 to invert scales
var x = d3.scaleBand()
  .domain(data.map(entry => entry.categoricalValue))
  .range([0, chartWidth]);

//join data to lines
const line = chart.selectAll('line')
    .data(data)
    
//update existing lines
line.attr('stroke', 'blue')
      .attr('stroke', 'blue')
      .attr('stroke-width', 2)
      .attr('x1', (d) => (x(d.categoricalValue) - (x.bandwidth() * 0.5)))
      .attr('y1', d => y(d.numericValue))
      .attr('x2', (d) => (x(d.categoricalValue) + (x.bandwidth() * 0.5)))
      .attr('y2', (d,i) => y( data[i + 1] ? data[i + 1].numericValue :  data[i].numericValue))  
      .attr('transform', `translate(${x.bandwidth()}, 0)`);

//draw the lines for any data that does not exist yet
line.enter()
    .append('line')
      .attr('stroke', '#080B3B')
      .attr('stroke-width', 2)
      .attr('x1', (d) => (x(d.categoricalValue) - (x.bandwidth() * 0.5)))
      .attr('x2', (d) => (x(d.categoricalValue) - (x.bandwidth() * 0.5)))
      .attr('y1', d => y(d.numericValue))
      .attr('y2', d => y(d.numericValue))
      .attr('transform', `translate(${x.bandwidth()}, 0)`)
      .transition().duration(250).delay( (d,i) => 250 * i).ease(d3.easeSinIn)
      //.attr('x2', (d) => (x(d.categoricalValue) + (x.bandwidth() * 0.5)))
      .attr('x2', (d,i) => data[i + 1] ? (x(d.categoricalValue) + (x.bandwidth() * 0.5)) : chartWidth - (1.5 * x.bandwidth()))
      .attr('y2', (d,i) => y( data[i + 1] ? data[i + 1].numericValue :  data[i].numericValue))  

//add circles
const points = chart.selectAll('circle')
  .data(data)
  .enter()
   .append('circle')
     .attr('cx', (d) => (x(d.categoricalValue) - (x.bandwidth() * 0.5)))
     .attr('cy', d => y(d.numericValue))
     .attr('r', 0)
     .attr('fill', '#545994')
     .attr('stroke', '#080B3B')
     .attr('stroke-width', '1px')
     .attr('opacity', 0)
     .attr('transform', `translate(${x.bandwidth()}, 0)`)
     .transition().duration(175).delay( (d,i) => 250 * i).ease(d3.easeSinIn)
     .attr('opacity', 1.0)
     .attr('r', 5);
       

//create and call the axes
const xAxis = d3.axisBottom(x);
const yAxis = d3.axisLeft(y);

xAxisGroup.call(xAxis);
yAxisGroup.call(yAxis);

 
