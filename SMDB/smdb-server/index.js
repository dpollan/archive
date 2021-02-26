const app = require('express')();
const bodyParser = require('body-parser');
const config = require('../config/config.js');
const jwt = require ('jsonwebtoken'); 
const util = require ('util');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//Set up CORS header
app.use((req,res,next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
})

//Set up JWT middleware function
function verifyToken(req,res,next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;
    next();
  } else {
    let msg = `Please sign in to use this feature`;
    res.status(403).json({msg})
  }
}


//Establish Database Connection
const mongoose = require('mongoose');
mongoose.connect(`mongodb://${config.HOST}:${config.MONGO_PORT}/${config.DATABASE}`,{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
  .then(() => {console.log('Database connection successfully established, server running on port ' + config.PORT) + '.\n'})
  .catch((err) => console.error('Error connecting to database: \n' + err));


//Load Auth Models
const User = require('./models/User');

//Load Crud Models
const Movie = require('./models/Movie');
const Actor = require('./models/Actor');
const Director = require('./models/Director');

//Routes
app.get('/', (req,res) => {
  res.json({msg: 'Server is up and running successfully'});
})

//SignUp Route
app.post('/api/signUp', (req,res) => {
  let body = req.body;
  User.findOne({username: body.username}).then((user) => {
    //If the username already exists inform the user that it is taken
    if (user !== null) {
      let msg = `Username ${body.username} is already taken`;
      return res.json({msg});
    }
    //otherwise create the user and send the created user object as the response.
    User.create({username: body.username, email: body.email}).then((createdUser) => {
      res.json(createdUser);
    })
  })
})

//Login Route
app.post('/api/login', (req,res) => {
  let body = req.body;
  User.findOne({username: body.username, email: body.email}).then((user) => {
    // if the user was not found or email was incorrect send a 403 error
    if (user === null) {
      let error = `The user ${body.username} was not found or the email ${body.email} is incorrect.  Please sign in or create a new user to continue`;
      res.status(403).json({error});
    } else {
      jwt.sign({user}, config.SECRETKEY, (err, token) => {
        res.json({token});
      })
    }
  }).catch((err) => res.send({error: err}))

})
  



/* Movie CRUD Routes
Note that Movie only allows updating of the Title, year, and genre.  Both the Actor and Director field will be greyed out and disabled on the form. Actors and directors must be updated using the /updateDirector and /updateActor routes.
*/


//Create Movie Route
app.post('/createMovie', verifyToken, (req,res) => {
  jwt.verify(req.token, config.SECRETKEY, (err,data) => {
    if (err) {
      return res.status(403).json({msg: 'Please sign in to use this feature'});
    }
    let body = req.body;
    //Mark as 'Unknown Director if the user does not specify a director
    if (body.director == '') {
      body.director = 'Unknown Director';
    }

    Movie.findOne({title: body.title}).then((foundMovie) => {
      //check for duplicate of the movie
      if (foundMovie !== null) {
        return res.json({msg: "Movie already exists in the database"});
      }

      //Check if the director already exists in the database
      Director.find({name: body.director})
      .then((director) => {
        //If director already exists Mongo will return an array containing the director document
        //Create a new Movie with the document's _id property as director
        if (director.length) {
          Movie.create({
            title: body.title,
            year: body.year,
            genre: body.genre,
            director: director[0]._id,
            createdBy: data.user._id  
          }).then((newMovie) => {
            newMovie.save().then((saved => {
              body.actor.forEach((actor, index) => {
                Actor.findOne({name: actors[index]}).then((foundActor) => {
                    //If the actor is already present link them to this film
                    if (foundActor !== null) {
                    foundActor.films.push(newMovie._id);
                    newMovie.actors.push(foundActor._id);
                    foundActor.save().then((saved) => saved);
                    if (index === actors.length - 1) {
                      newMovie.save().then((savedMovie) => {
                        console.log('movie ' + savedMovie)
                      })
                    }
                  } else {
                    //If the actor does not exist create them and link them to this film
                    Actor.create({name: actors[index], createdBy: data.user._id}).then((newActor) => {
                      newActor.films.push(newMovie._id);
                      newMovie.actors.push(newActor._id);
                      newActor.save();
                      if (index === actors.length - 1) {
                        newMovie.save().then((savedMovie) => {
                          console.log('movie ' + savedMovie)
                        })
                      }
                    })
                  }
                })
              })
            })).catch((err) => res.send({error: err}))
            Director.findOneAndUpdate({_id: newMovie.director},{$push : {films: newMovie._id}})
            .then((updatedDirector) => null);
            res.json(newMovie);
          }).catch((err) => res.send({error: err}))
        }

        //If director was not found Mongo returns an empty array so create the director document
        //Then create a New Movie with the director's _id property as director 
        if (!director.length) {
          Director.create({
            name: body.director,
            films: [],
            createdBy: data.user._id
          }).then((newDirector) => { 
            newDirector.save();

          Movie.create({
            title: body.title,
            year: body.year,
            genre: body.genre,
            director: newDirector._id,
            createdBy: data.user._id
          }).then((newMovie) => {
            newDirector.films.push(newMovie._id);
            newDirector.save();

            //add all the actors
            let actors = body.actors.split(',');
            actors.forEach((actor, index) => {
              //Check if the actor already exists in the database
              Actor.findOne({name: actors[index]}).then((foundActor) => {
                if(foundActor !== null) {
                  foundActor.films.push(newMovie._id);
                  newMovie.actors.push(foundActor._id);
                  foundActor.save().then((savedActor) => {
                    if (index === actors.length -1) {
                      newMovie.save();
                    }
                  })
                } else {
                //Create the new actor if they do not exist
                  Actor.create({name: actor, createdBy: data.user._id}).then((newActor) => {
                    newActor.films.push(newMovie._id);
                    newMovie.actors.push(newActor._id);
                    newActor.save().then((savedActor) => { 
                      if (index === actors.length - 1) {
                        newMovie.save();
                      }
                    })
                  })
                }
              })        
            });
            res.json(newMovie);
            }).catch((err) => (err) => res.send({error: err}))
          }).catch((err) => (err) => res.send({error: err}))
        }    
      });
    })
  })
});

//Read Movie Route
app.get('/readMovie/:title', (req,res) => {
  Movie.find({title: req.params.title})
  .populate('director')
  .populate('actors')
  .populate('updatedBy')
  .populate('createdBy')
  .then((movie) => {
    if (!movie.length) {
      return res.json({msg: "Movie " + body.title + " not found."})
    }
    
    res.status(200).json(movie);
  })
  .catch((err) => (err) => res.send({error: err}));
})

//Update Movie Route
app.post('/updateMovie', verifyToken, (req,res) => {
  jwt.verify(req.token, config.SECRETKEY, (err,data) => {
    if (err) {
      return res.status(403).json({msg: 'Please sign in to use this feature'});
    }
    let body = req.body;
    body.updatedBy = data.user._id;
    Movie.findOneAndUpdate({_id: body._id}, {title: body.title, year: body.year, genre: body.genre, updatedBy: body.updatedBy}).then((updatedMovie) => {
      body.actors.forEach((actorName, index) => {
        Actor.find({name: actorName}).then((foundActor) => {
          //if the actor does not exist create them and link to the movie
          if (foundActor.length === 0) {
            Actor.create({name: actorName, films: [updatedMovie._id], createdBy: data.user._id}).then((createdActor) => {              
              updatedMovie.actors.push(createdActor._id);
              createdActor.save();
              Movie.findOneAndUpdate({_id: updatedMovie._id}, {$push: {actors: createdActor._id}}).then(() => console.log('movie updated'))         
            })
          } else {
            //if the actor does exist and is not linked then just link them to the movie
            if(foundActor[0].films.indexOf(updatedMovie._id) === -1) {
              foundActor[0].films.push(updatedMovie._id);
              Movie.findOneAndUpdate({_id: updatedMovie._id}, {$push: {actors: foundActor[0]._id}}).then(() => console.log('movie updated'))
            }   
          }
        })
        res.json(updatedMovie);
      })
    //now update the movie to contain actors that were added
      
    }).catch((err) => (err) => res.send({error: err}));    
  })
});

//Delete Movie Route
app.post('/deleteMovie', verifyToken, (req,res) => {
  jwt.verify(req.token, config.SECRETKEY, (err,data) => {
    if (err) {
      return res.status(403).json({msg: 'Please sign in to use this feature'});
    }
    let body = req.body;
    Movie.findOneAndDelete({_id: body._id}).then((deletedMovie) => {
      console.log('movie deleted');
      res.status(200).json({msg: 'Movie ' + deletedMovie.title + ' deleted.'});
    })
    .catch((err) => (err) => res.send({error: err}));
  })
});

//Director CRUD Routes

//Create Director Route
app.post('/createDirector', verifyToken, (req,res) => {
  jwt.verify(req.token, config.SECRETKEY, (err,data) => {
    if (err) {
      return res.status(403).json({msg: 'Please sign in to use this feature'});
    }
    let body = req.body;
    //Check if the director already exists in the database
    Director.findOne({name: body.name}).then((foundDirector) => {
      if (foundDirector !== null){
        return res.json({msg: "This director is already in the database"});
      }

      //If no film was entered Create the Director with an empty array for films
      if (body.films === "") {
        return Director.create({name: body.name, createdBy: data.user._id}).then((newDirector) => {
          newDirector.save();
          res.json({msg: "Director created"});
        }) 
      }

      Director.create({name: body.name, createdBy: data.user._id}).then((newDirector) => {
        let films = body.films.split(",");
        films.forEach((film, index) => {
          Movie.findOne({title: films[index]}).then((foundMovie) => {
            //if the movie already exists link the director and movie
            if (foundMovie !== null) {
              foundMovie.director = newDirector._id;
              newDirector.films.push(foundMovie._id);
              foundMovie.save().then((saved) => "saved");
              if (index == films.length - 1) {
                newDirector.save().then((savedDirector) => {
                  let msg = `Director ${body.name} saved to the database`;
                  res.status(200).json({msg: msg});
                })
              }
            } else {
            //If the movie does not already exist create it and link director and movie
            Movie.create({title: films[index], createdBy: data.user._id}).then((newMovie) => {
              newMovie.director = newDirector._id;
              newDirector.films.push(newMovie._id);
              newMovie.save().then((saved) => {
                if (index == films.length - 1) {
                  newDirector.save().then((saved) => {
                    let msg = `Director ${body.name} saved to the database`;
                    res.status(200).json({msg: msg});
                  })
                }  
              })
            })
          }})
        })
    })
    msg = `Director ${newDirector.name} added to the database.`;
    res.status(200).json({msg: msg});
    })
    .catch((err) => (err) => res.send({error: err}));
  })
});

//Read Director Route
app.get('/readDirector/:name', (req,res) => {
  Director.find({name: req.params.name})
  .populate('films')
  .populate('createdBy')
  .populate('updatedBy')
  .then((director) => {
    if (!director.length) {
      return res.json({msg: "The director " + req.params.name + " is not present in the database."})
    }
    res.status(200).json(director);
  })
  .catch((err) => (err) => res.send({error: err}));
})

//Update Director Route
app.post('/updateDirector', verifyToken, (req,res) => {
  jwt.verify(req.token, config.SECRETKEY, (err,data) => {
    if (err) {
      return res.status(403).json({msg: 'Please sign in to use this feature'});
    }
    let body = req.body;
    Director.findOneAndUpdate({_id: req.body._id}, {name: body.name, updatedBy: data.user._id}).then((updatedDirector) => {
      body.films.forEach((movie) => {
        Movie.find({title: movie}).then((foundMovie) => {
          //If the film does not already exist, create and link it
          if(foundMovie.length === 0) {
            Movie.create({title: movie, director: req.body._id, createdBy: data.user._id})
              .then((createdMovie) => {
                console.log(movie.title);
                updatedDirector.films.push(createdMovie._id);
                createdMovie.save();
                Director.findOneAndUpdate({_id: updatedDirector._id}, {$push: {films: createdMovie._id}}).then(() => console.log('Director updated'))
              })
          } else {
            //If the movie does exist link it to the director and vice versa
            if (foundMovie[0].director !== req.body._id) {
              console.log(foundMovie[0]);
              foundMovie[0].director = req.body._id;
              foundMovie[0].save();
              Director.findOneAndUpdate({_id: updatedDirector._id}, {$push: {films: foundMovie[0]._id}}).then(() => console.log('director updated'));
            } 
          }
        })
      })
      //Note: Only the directors name can be updated.  Films must be changed using updateMovie route
      let msg = `The director ${updatedDirector.name} was updated in the database`
      res.status(200).json({msg: msg});
    })
  .catch((err) => (err) => res.send({error: err}));
  })
});

//Delete Director Route
app.post('/deleteDirector', verifyToken, (req,res) => {
  jwt.verify(req.token, config.SECRETKEY, (err,data) => {
    if (err) {
      return res.status(403).json({msg: 'Please sign in to use this feature'});
    }
    let body = req.body;
    console.log(body._id);
    Director.findOneAndDelete({_id: body._id}).then((deletedDirector) => {
      console.log('Director deleted');
      res.status(200).json({msg: 'Director ' + deletedDirector.name + ' deleted.'});
    })
    .catch((err) => (err) => res.send({error: err}));
  })
});

//Actor CRUD routes

//Create Actor Route

app.post('/createActor', verifyToken, (req,res) => {
  jwt.verify(req.token, config.SECRETKEY, (err,data) => {
    if (err) {
      return res.status(403).json({msg: 'Please sign in to use this feature'});
    }

    let body = req.body;
    let films = body.films.split(',');
    Actor.findOne({name: body.name}).then((foundActor) => {

      // make sure the actor does not already exist
      if (foundActor !== null) {
        return res.json({msg: "This actor already exists in the database"});
      }

      //If the actor does not exist create them
      Actor.create({name: body.name, createdBy: data.user._id}).then((newActor) => {
        //Iterate through all the films for this actor
        films.forEach((film, index) => {

          //If no film was entered Create the actor with an empty array for films
          if (films[0] === "") {
            newActor.save();
            return res.json({msg: "Actor created"});
          }

          Movie.findOne({title: films[index]}).then((foundFilm) => { 

            //If the film already exists, link the film and actor
            if(foundFilm !== null){
              foundFilm.actors.push(newActor._id);
              foundFilm.save().then((saved) => null);
              newActor.films.push(foundFilm._id);
              if (index === films.length - 1) {
                newActor.save().then((savedActor) => {
                  let msg = `Actor ${savedActor.name} added to the database`;
                  res.status(200).json({msg: msg});
                })
              }
            } else {
            //If the film does not yet exist, create it and link film and actor
              Movie.create({title: films[index], createdBy: data.user._id}).then((newFilm) => {
                newFilm.actors.push(newActor._id);
                newActor.films.push(newFilm._id);
                newFilm.save().then((saved) => {
                  if (index === films.length - 1) {
                    newActor.save().then((savedActor) => {
                      let msg = `Actor ${savedActor.name} added to the database`;
                      res.json({msg: msg});
                    })
                  }
                });
              });
            }
          });
        });
      })
    })
  })
})
              

  

//Read Actor Route
app.get('/readActor/:name', (req,res) => {
  Actor.find({name: req.params.name})
  .populate('films')
  .populate('createdBy')
  .populate('modifiedBy')
  .then((actor) => {
    if (!actor.length) {
      return res.json({msg: "The actor " + body.name + " is not present in the database."})
    }
    res.status(200).json(actor);
  })
  .catch((err) => (err) => res.send({error: err}));
})

//Update Actor Route
app.post('/updateActor', verifyToken, (req,res) => {
  jwt.verify(req.token, config.SECRETKEY, (err,data) => {
    if (err) {
      return res.status(403).json({msg: 'Please sign in to use this feature'});
    }
    let body = req.body;
    Actor.findOneAndUpdate({_id: req.body._id}, {name: req.body.name, updatedBy: data.user._id}).then((updatedActor) => {
      body.films.forEach((movie) => {
        Movie.find({title: movie}).then((foundMovie) => {
          //If the film does not already exist, create and link it
          if(foundMovie.length === 0) {
            Movie.create({title: movie, actors: [req.body._id], createdBy: data.user._id})
            .then((createdMovie) => {
              updatedActor.films.push(createdMovie._id);
              createdMovie.save();
              Actor.findOneAndUpdate({_id: updatedActor._id}, {$push: {films: createdMovie._id}}).then(() => console.log('Actor Updated'));
            })
          } else {
            //If the movie already exists link it to actor and vice versa
            if(foundMovie[0].actor.length) {
              foundMovie[0].actors.push(req.body._id);
              foundMovie[0].save();
              Actor.findOneAndUpdate({_id: updatedActor._id}, {$push: {films: foundMovie[0]._id}}).then(() => console.log('actor updated'));
            }
          }
        })
      })
      msg = `The actor ${updatedActor.name} was updated in the database`;
      res.status(200).json(msg);
    }).catch((err) => (err) => res.send({error: err}));
  })
})
    
//Delete Actor Route
app.post('/deleteActor', verifyToken, (req,res) => {
  jwt.verify(req.token, config.SECRETKEY, (err,data) => {
    if (err) {
      return res.status(403).json({msg: 'Please sign in to use this feature'});
    }
    let body = req.body;
    Actor.findOneAndDelete({_id: body._id}).then((deletedActor) => {
      res.status(200).json({msg: 'The Actor ' + deletedActor.name + ' has been removed from the database.'});
    })
    .catch((err) => (err) => res.send({error: err}));
  })
});


//Launch Simple Movie Database Server
console.log('Database server is listening on port ' + config.PORT);
app.listen(config.PORT);



