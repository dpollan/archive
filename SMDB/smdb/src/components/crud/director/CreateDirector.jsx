import React, {useState} from 'react';
import axios from 'axios';

function CreateDirector(props) {
  const [director, setDirector] = useState(
    {
      _id: '',
      name: '',
      films: '',
      film0: '',
      film1: '',
      film2: '',
      film3: '',
      film4: '',
      createdBy: {username: ''},
      modifiedBy: {username: ''},
      loading: false      
    }
  );

const [filmCount, setFilmCount] = useState({n: 0});
  
  const handleChange = (e) => {
    e.persist();
    const changedField = e.target.id;
    setDirector( (prevState => {
      prevState[changedField] = e.target.value;
      return {...prevState};
    }))
  }

  const handleAddFilm = (e) => {
    e.preventDefault();
    if (filmCount.n === 4){
      return setFilmCount({n: 4, full: true});    }
    setFilmCount({n: parseInt(e.target.id[3]) + 1, full: false});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let films = [director.film0, director.film1, director.film2, director.film3, director.film4].filter((film) => film !== '').toString();     
    setDirector( (prevState => {
      prevState['films'] = films;
      prevState['loading'] = true;
      return {...prevState};
    }));
    axios.post('/createDirector', director, {headers: {"Authorization" : "bearer " + localStorage.getItem("token")}}) 
      .then( (film) => {
        setTimeout(() => window.location=`/readDirector/${director.name}`, 2000)    
      }).catch( (err) => {
        console.error(err);
      })   
  }


  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header bg-dark text-light">
          <h1>Create a new Director</h1>
        </div>
        <div className="card-body bg-light">
          <form onSubmit={() => null}>

            <div className="form-group">   
              <label className="text-center h6 my-0" htmlFor="title">
                Director Name:
              </label>
              <input className="form-control" id="name" type="text" value={director.name} onChange={handleChange}/>            
            </div>           

            <label className="text-center h6 my-0" >
                  Movies: 
              </label>
            {[1,2,3,4,5].map((film,index) => (
              <div key={index} style={index <= filmCount.n ? {display: 'block'} : {display: 'none'}}> 
              
              <div className="input-group mb-3">  
                <input className="form-control" id={'film' + index} type="text" value={director['film' + index]} onChange={handleChange}/>
                <div className="input-group-append">
                  <button className="btn btn-dark text-light" id={'btn'+index} style={index === filmCount.n ? {display: 'inline'} : {display: 'none'}} onClick={handleAddFilm}>+</button>
                </div>     
                </div>  
              </div>
            ))}
            {filmCount.full ? (<h4 className="alert-danger h5">A maximum of 5 movies at a time can be added to a director.  Use Update Director to add more films</h4>) : null}       
            <button className="btn btn-outline-secondary" onClick={handleSubmit}>Add New Director</button>  
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

export default CreateDirector;