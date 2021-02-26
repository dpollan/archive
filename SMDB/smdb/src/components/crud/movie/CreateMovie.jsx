import React, { useState } from 'react'; 
import axios from 'axios';

function CreateMovie(props) {
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
    let actors = [movie.actor0, movie.actor1, movie.actor2, movie.actor3, movie.actor4].filter((actor) => actor !== '').toString();   
    setMovie( (prevState => {
      prevState['actors'] = actors;
      prevState['loading'] = true;
      return {...prevState};
    }));
    axios.post('/createMovie', movie, {headers: {"Authorization" : "bearer " + localStorage.getItem("token")}}) 
      .then( (film) => {
        console.log(film);
        setTimeout(() => window.location=`/readMovie/${movie.title}`, 2000)    
      }).catch( (err) => {
        console.table(err);
        window.location='/403';
      })   
  }


  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header bg-dark text-light">
          <h1>Create a new Movie</h1>
        </div>
        <div className="card-body bg-light">
          <form onSubmit={() => null}>

            <div className="form-group">   
              <label className="text-center h6 my-0" htmlFor="title">
                Title:
              </label>
              <input className="form-control" id="title" type="text" value={movie.name} onChange={handleChange}/>            
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
              <input className=" form-control" id="director" type="text" value={movie.director.name} onChange={handleChange}/>
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
            <button className="btn btn-outline-secondary" onClick={handleSubmit}>Add Movie</button>
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

export default CreateMovie;
