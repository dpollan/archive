import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UpdateMovie() {

  //Initial state must be set up before populating the form because until the async readMovie call is made we do not have values for the initial form.  It should update once the call completes.  

  const [movie, setMovie] = useState(
    {
      _id: '',
      title: '',
      year: '',
      genre: '',
      director: '',
      actor0: '',
      actor1: '',
      actor2: '',
      actor3: '',
      actor4: '',
      actorFull: false,
      createdBy: {username: ''},
      modifiedBy: {username: ''},
      loading: false      
    }
  );

  let {title} = useParams();
  
  //Get the movie specified in the URL and populate the form disabling actor and director
  useEffect(() => {
    axios.get(`/readMovie/${title}`).then((movie) => {
      movie.data[0].director = movie.data[0].director ? movie.data[0].director : {name: "Director Not Found"}
      setMovie({
        _id: movie.data[0]._id,
        title: movie.data[0].title,
        year: movie.data[0].year,
        genre: movie.data[0].genre,
        director: movie.data[0].director.name,
        actors: movie.data[0].actors.length,
        actor0: '',
        actor1: '',
        actor2: '',
        actor3: '',
        actor4: '',
        actorFull: false,
        prevActors: movie.data[0].actors,
        createdBy: movie.data[0].createdBy.username
      })
    }).catch((err) => console.error(err));
  }, []);
    
const [count, setCount] = useState({n: 0});
  
  const handleChange = (e) => {
    e.persist();
    const changedField = e.target.id;
    setMovie( (prevState => {
      prevState[changedField] = e.target.value;
      return {...prevState};
    }))

  }

  const handleAddActor = (e) => {
    e.preventDefault();
    if (count.n === 4){
      return setCount({n: 4, full: true});    }
    setCount({n: parseInt(e.target.id[3]) + 1, full: false});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let addedActors = [movie.actor0, movie.actor1, movie.actor2, movie.actor3, movie.actor4].filter((actor) => actor !== '');
    setMovie( (prevState => {
      prevState['loading'] = true;
      return {...prevState};
    }));
    axios.post('/updateMovie', {
      _id: movie._id,
      title: movie.title,
      year: movie.year,
      genre: movie.genre,
      actors: addedActors
    }, {headers: {"Authorization" : "bearer " + localStorage.getItem("token")}}) 
      .then( (film) => {
        setTimeout(() => window.location = `/readMovie/${movie.title}`, 1000);        
      }).catch( (err) => {
        console.error(err);
      })   
  }


  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header bg-dark text-light">
          <h1>Update Movie {movie.title}</h1>
        </div>
        <div className="card-body bg-light">
          <form onSubmit={() => null}>

            <div className="form-group">   
              <label className="text-center h6 my-0" htmlFor="title">
                Title:
              </label>
              <input className="form-control" id="title" type="text" value={movie.title} onChange={handleChange}/>            
            </div>  
            
            <div className="form-group">
              <label className="text-center h6 my-0" htmlFor="year">
                Year: 
              </label>
              <input className="form-control" id="year" type="text" value={movie.year} onChange={handleChange}/>          
            </div>

            <div className="form-group">
              <label className="text-center h6 my-0" htmlFor="genre">
                Genre: 
              </label>
              <input className="form-control" id="genre" type="text" value={movie.genre} onChange={handleChange}/>
            </div>

            <div className="form-group">
              <label className="text-center h6 my-0" htmlFor="director">
                Director: 
              </label>
              <input className=" form-control" id="director" type="text" value={movie.director} disabled/>
            </div>
            

            <label className="text-center h6 my-0" >
                  Actors: 
              </label>
            {[1,2,3,4,5].map((actor,index) => (
              <div key={index} style={index <= count.n ? {display: 'block'} : {display: 'none'}}> 
              
              <div className="input-group mb-3">  
                <input className="form-control" id={'actor' + index} type="text" value={movie['actor' + index]} onChange={handleChange}/>
                <div className="input-group-append">
                  <button className="btn btn-dark text-light" id={'btn'+index} style={index === count.n ? {display: 'inline'} : {display: 'none'}} onClick={handleAddActor}>+</button>
                </div>     
                </div>  
              </div>
            ))}
            {count.full ? (<h4 className="alert-danger h5">A maximum of 5 actors can be added at one time</h4>) : null} 
            <p className={movie.loading ? "display-block" : "display-none"}>{!isNaN(movie.actors) ? movie.actors + " aditional actors already listed for this film." : "Updating Movie..."}</p>      
            <button className="btn btn-outline-secondary" onClick={handleSubmit}>Save Changes</button>
            <div className="mt-3">
              <div className={movie.loading ? "spinner-border mx-4" : "spinner-border  mx-4 d-none"} role="status">
                <span className="sr-only">Loading...</span>
              </div>  
            </div>     
          </form>
        </div>
      </div>
    </div>)
}

export default UpdateMovie;
