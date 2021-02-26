import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

function UpdateActor() {

  //Initial state must be set up before populating the form because until the async readMovie call is made we do not have values for the initial form.  It should update once the call completes.  

  const [actor, setActor] = useState(
    {
      _id: '',
      name: '',
      film0: '',
      film1: '',
      film2: '',
      film3: '',
      film4: '',
      filmFull: false,
      createdBy: {username: ''},
      modifiedBy: {username: ''},
      loading: false      
    }
  );

  let {name} = useParams();
  
  //Get the movie specified in the URL and populate the form disabling actor and director
  useEffect(() => {
    axios.get(`/readActor/${name}`).then((actor) => {
      setActor({
        _id: actor.data[0]._id,
        name: actor.data[0].name,
        films: actor.data[0].films.length,
        film0: '',
        film1: '',
        film2: '',
        film3: '',
        film4: '',
        filmFull: false,
        prevFilms: actor.data[0].films,
        createdBy: actor.data[0].createdBy.username
      })
    }).catch((err) => console.error(err));
  }, []);
    
const [count, setCount] = useState({n: 0});
  
  const handleChange = (e) => {
    e.persist();
    const changedField = e.target.id;
    setActor( (prevState => {
      prevState[changedField] = e.target.value;
      return {...prevState};
    }))

  }

  const handleAddMovie = (e) => {
    e.preventDefault();
    if (count.n === 4){
      return setCount({n: 4, full: true});    }
    setCount({n: parseInt(e.target.id[3]) + 1, full: false});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let addedFilms = [actor.film0, actor.film1, actor.film2, actor.film3, actor.film4].filter((movie) => movie !== '');
    setActor( (prevState => {
      prevState['loading'] = true;
      return {...prevState};
    }));
    axios.post('/updateActor', {
      _id: actor._id,
      name: actor.name,
      films: addedFilms
    }, {headers: {"Authorization" : "bearer " + localStorage.getItem("token")}}) 
      .then( (film) => {
        setTimeout(() => window.location = `/readActor/${actor.name}`, 1000);        
      }).catch( (err) => {
        console.error(err);
      })   
  }

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header bg-dark text-light">
          <h1>Update Actor {actor.name}</h1>
        </div>
        <div className="card-body bg-light">
          <form onSubmit={() => null}>

            <div className="form-group">   
              <label className="text-center h6 my-0" htmlFor="name">
                Actor Name:
              </label>
              <input className="form-control" id="name" type="text" value={actor.name} onChange={handleChange}/>            
            </div> 

            <label className="text-center h6 my-0" >
                  Movies: 
              </label>
            {[1,2,3,4,5].map((film,index) => (
              <div key={index} style={index <= count.n ? {display: 'block'} : {display: 'none'}}> 
              
              <div className="input-group mb-3">  
                <input className="form-control" id={'film' + index} type="text" value={actor['film' + index]} onChange={handleChange}/>
                <div className="input-group-append">
                  <button className="btn btn-dark text-light" id={'btn'+index} style={index === count.n ? {display: 'inline'} : {display: 'none'}} onClick={handleAddMovie}>+</button>
                </div>     
                </div>  
              </div>
            ))}
            {count.full ? (<h4 className="alert-danger h5">A maximum of 5 films can be added at one time</h4>) : null} 
            <p className={actor.loading ? "display-block" : "display-none"}>{!isNaN(actor.films) ? actor.films + " aditional films already listed for this director." : "Updating Actor..."}</p>      
            <button className="btn btn-outline-secondary" onClick={handleSubmit}>Save Changes</button>
            <div className="mt-3">
              <div className={actor.loading ? "spinner-border mx-4" : "spinner-border  mx-4 d-none"} role="status">
                <span className="sr-only">Loading...</span>
              </div>  
            </div>                         
          </form>
        </div>
      </div>
    </div>)
}

export default UpdateActor;