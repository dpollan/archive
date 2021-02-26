import React, {useState} from 'react';
import axios from 'axios';

function CreateActor(props) {
  const [actor, setActor] = useState(
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

const [count, setCount] = useState({n: 0});
  
  const handleChange = (e) => {
    e.persist();
    const changedField = e.target.id;
    setActor( (prevState => {
      prevState[changedField] = e.target.value;
      return {...prevState};
    }))
  }

  const handleAddFilm = (e) => {
    e.preventDefault();
    if (count.n === 4){
      return setCount({n: 4, full: true});    }
    setCount({n: parseInt(e.target.id[3]) + 1, full: false});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let films = [actor.film0, actor.film1, actor.film2, actor.film3, actor.film4].filter((film) => film !== '').toString();     
    setActor( (prevState => {
      prevState['films'] = films;
      prevState['loading'] = true;
      return {...prevState};
    }));
    axios.post('/createActor', actor, {headers: {"Authorization" : "bearer " + localStorage.getItem("token")}}) 
      .then( (film) => {
        setTimeout(() => window.location=`/readActor/${actor.name}`, 2000)    
      }).catch( (err) => {
        console.error(err);
      })   
  }


  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header bg-dark text-light">
          <h1>Create a new Actor</h1>
        </div>
        <div className="card-body bg-light">
          <form onSubmit={() => null}>

            <div className="form-group">   
              <label className="text-center h6 my-0" htmlFor="title">
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
                  <button className="btn btn-dark text-light" id={'btn'+index} style={index === count.n ? {display: 'inline'} : {display: 'none'}} onClick={handleAddFilm}>+</button>
                </div>     
                </div>  
              </div>
            ))}
            {count.full ? (<h4 className="alert-danger h5">A maximum of 5 movies per actor can be added.  Use Update Actor to add more films for this actor</h4>) : null}       
            <button className="btn btn-outline-secondary" onClick={handleSubmit}>Add Actor</button>  
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

export default CreateActor;