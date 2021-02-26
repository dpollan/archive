const app = require('express')();

app.get('/', (req,res) => res.sendFile('/code/javascript/jsDataStructures-reference/index.html'));

app.get('/stack.js', (req,res) => res.sendFile('/code/javascript/jsDataStructures-reference/data_structures/stack.js'));

app.get('/queue.js', (req,res) => res.sendFile('/code/javascript/jsDataStructures-reference/data_structures/queue.js'));

console.log('listening on localhost 4000');
app.listen(4000);