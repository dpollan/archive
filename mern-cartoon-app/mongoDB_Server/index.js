//Set up Express server and dependencies
const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//Set up CORS header
app.use((req,res,next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

//Create the Mongoose connection
const config = require('./config/config.js');
const mongoose = require('mongoose');
mongoose.connect(`mongodb://${config.HOST}:${config.PORT}/${config.DATABASE}`, {useNewUrlParser: true, useFindAndModify: false})
  .then(() => console.log('Database connection successfully established'))
 .catch((err) => console.error('Error connecting to database: \n' + err));

 //Load Mongoose Models
 const TOON = require('./models/Toon');
 const SHOW = require('./models/Show');
 const EMPLOYER = require('./models/Employer');


//Routes

//default Route
app.get('/', (req,res) => {
  res.send({sanity: "check", message: "App is listening", nextUp: "Build all the routes now"});
})

//Create Route
app.post('/createToon', (req,res) => {
  console.log('Create Request Recieved');
  let body = req.body;
  TOON.create(
    {
      first: body.first, 
      last: body.last,
      sex: body.sex,
      image: body.image,
      quotes: body.quotes,
      show: body.show,
      employer: body.employer,
      rating: body.rating
    })
    .then((newCartoon) => {
      newCartoon.save();
      res.status(201).send('Added toon to database');
    })
    .catch((err) => {
      console.error(err);
    })
  console.log('Create Request Processed');
})

//Read Route using find by ID
app.post('/findToonById', (req,res) => {
  let body = req.body;
  TOON.findOne({_id: body._id})
    .then((foundToon) => {
      foundToon ? res.status(200).send(foundToon) : res.status(404).send('Could not find cartoon: ' + body.first + ' ' + body.last + ' in the database, consider adding them');
    })
})

//Read Route using find by name 
app.post('/findToonByName', (req,res) => {
  let body = req.body;
  TOON.findOne({first: body.first.trim(), last: body.last.trim()})
    .populate('show')
    .then((foundToon) => {
      foundToon ? res.status(200).send(foundToon) : res.status(404).send('Could not find cartoon: ' + body.first + ' ' + body.last + ' in the database, consider adding them');
    })
})

//Read Route using find by show
app.post('/findToonsByShow', (req,res) => {
  let body = req.body;
  SHOW.findOne({ title: body.title})
    .then((show) => {
      TOON.find({show: show._id})
        .then((foundToons) => {
          foundToons.length ? res.status(200).send(foundToons) : res.status(404).send()
        })
        .catch((err) => {
          console.error('Error when fetching toons: __________\n' + err);
        })
      })
    .catch((err) => {
      console.error('Error when fetching show: ______' + err);
    })
})

//Update Route using find by id
app.post('/updateToon', (req,res) => {
  let body = req.body; 
  let id = body._id;
  TOON.findOneAndUpdate({_id: id},{...body})
    .then((updatedToon) => {
      res.status(200).send(updatedToon);
    })
    .catch((err) => {
      console.error('Error when updating cartoon: _____' + err);
    })
});

//Delete route for deleting record by id
app.post('/deleteToon', (req,res) => {
  let body = req.body;
  console.log(body);
  TOON.deleteOne({_id: body._id})
    .then((deletedToon) => {
      console.log('toon deleted');
      res.status(200).send(deletedToon);
    })
    .catch((err) => {
      console.error('Error when deleting cartoon: _____' + err);
    })
});

//Start the Server
console.log('Mongo DB Server is listening on port 3009');
app.listen(3009);