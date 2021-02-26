const express = require('express');
const app = express();

//chart reference files
app.get('/bar-chart', (req,res) => res.sendFile('/home/davos/code/javascript/d3/d3_reference/src/modules/barChartBasic.js'));

app.get('/line-chart', (req,res) => res.sendFile('/home/davos/code/javascript/d3/d3_reference/src/modules/lineChartBasic.js'));

//main route
app.use('/', (req,res) => res.sendFile('/home/davos/code/javascript/d3/d3_reference/index.html'));


console.log('server listening on 3001');
app.listen(3001);
