import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

function UpdateDirector() {

  //Initial state must be set up before populating the form because until the async readMovie call is made we do not have values for the initial form.  It should update once the call completes.  

  const [director, setDirector] = useState(
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
    axios.get(`/readDirector/${name}`).then((director) => {
      setDirector({
        _id: director.data[0]._id,
        name: director.data[0].name,
        films: director.data[0].films.length,
        film0: '',
        film1: '',
        film2: '',
        film3: '',
        film4: '',
        filmFull: false,
        prevFilms: director.data[0].films,
        createdBy: director.data[0].createdBy.username
      })
    }).catch((err) => console.error(err));
  }, []);
    
const [count, setCount] = useState({n: 0});
  
  const handleChange = (e) => {
    e.persist();
    const changedField = e.target.id;
    setDirector( (prevState => {
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
    let addedFilms = [director.film0, director.film1, director.film2, director.film3, director.film4].filter((movie) => movie !== '');
    setDirector( (prevState => {
      prevState['loading'] = true;
      return {...prevState};
    }));
    axios.post('/updateDirector', {
      _id: director._id,
      name: director.name,
      films: addedFilms
    }, {headers: {"Authorization" : "bearer " + localStorage.getItem("token")}}) 
      .then( (film) => {
        setTimeout(() => window.location = `/readDirector/${director.name}`, 1000);        
      }).catch( (err) => {
        console.error(err);
      })   
  }


  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header bg-dark text-light">
          <h1>Update Director {director.name}</h1>
        </div>
        <div className="card-body bg-light">
          <form onSubmit={() => null}>

            <div className="form-group">   
              <label className="text-center h6 my-0" htmlFor="name">
                Director Name:
              </label>
              <input className="form-control" id="name" type="text" value={director.name} onChange={handleChange}/>            
            </div> 

            <label className="text-center h6 my-0" >
                  Movies: 
              </label>
            {[1,2,3,4,5].map((film,index) => (
              <div key={index} style={index <= count.n ? {display: 'block'} : {display: 'none'}}> 
              
              <div className="input-group mb-3">  
                <input className="form-control" id={'film' + index} type="text" value={director['film' + index]} onChange={handleChange}/>
                <div className="input-group-append">
                  <button className="btn btn-dark text-light" id={'btn'+index} style={index === count.n ? {display: 'inline'} : {display: 'none'}} onClick={handleAddMovie}>+</button>
                </div>     
                </div>  
              </div>
            ))}
            {count.full ? (<h4 className="alert-danger h5">A maximum of 5 films can be added at one time</h4>) : null} 
            <p className={director.loading ? "display-block" : "display-none"}>{!isNaN(director.films) ? director.films + " aditional films already listed for this director." : "Updating director..."}</p>      
            <button className="btn btn-outline-secondary" onClick={handleSubmit}>Save Changes</button>
            <div className="mt-3">
              <div className={director.loading ? "spinner-border mx-4" : "spinner-border  mx-4 d-none"} role="status">
                <span className="sr-only">Loading...</span>
              </div>  
            </div>                         
          </form>
        </div>
      </div>
    </div>)
}

export default UpdateDirector;