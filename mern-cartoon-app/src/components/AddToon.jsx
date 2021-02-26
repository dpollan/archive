import React, { useState } from 'react'; 
import axios from 'axios';

function AddToon(props) {
  const [toonState, toonSetState] = useState(
    {
      _id: 0,
      first: '',
      last: '',
      sex: 0,
      image: '',
      quotes: [],
      show: '',
      rating: 0
    }
  );

  const [uiFeedback, uiFeedbackSetState] = useState(
    {
      msg: ''
    }
  )
  
  const handleChange = (e) => {
    e.persist();
    const changedField = e.target.id;
    toonSetState( (prevState => {
      prevState[changedField] = e.target.value;
      //TODO add a way to handle quotes, show and employer fields
      return {...prevState};
    }))
  }

  const handleCreate = (e) => {
    e.preventDefault();
    let data = toonState;
    data.sex === 'Male' ? data.sex = 1 : data.sex = 0;
    //for testing purposes debug in the show id TODO: add selection for this
    data.show = '5d76f1faa45a6fd435015b23'
    axios.post('http://localhost:3000/createToon', data)
      .then( (toon) => {
        console.log(uiFeedbackSetState)
        uiFeedbackSetState({msg: 'Cartoon ' + data.first + " " + data.last + " created and added to the database."});
      })
      .catch( (err) => {
        uiFeedbackSetState({msg: 'An error has occurred, cartoon was not added'});
      })   
  
    console.log('submitted')
    setTimeout(props.back, 1000);
  }
  //{toonState.image ? (<img src={toonState.image} />) : null} TODO - only send get request when user has completed filling in the url

  return (
    <div>
      <h1> hello from react toon form </h1>
      <form onSubmit={() => console.log('submit fired')}>
        <label>
          First: 
          <input id='first' type='text' value={toonState.first} onChange={handleChange}/>
        </label>
        <label>
          Last: 
          <input id='last' type='text' value={toonState.last} onChange={handleChange}/>
        </label>
        <label>
        <input id='sex' type='radio' value='Male' checked={toonState.sex === 'Male'} onChange={handleChange}/>
          Male           
        </label>
        <label>
          <input id='sex' type='radio' value='Female' checked={toonState.sex === 'Female'} onChange={handleChange}/>
          Female 
        </label>
        <label>
          Image URL: 
          <input id='image' type='text' value={toonState.image} onChange={handleChange}/>
          <div>
            <p>Image Placehoder, find a way for user to see the imgage from the URL they added before they submit form data</p>
          </div>
        </label>
        <label>
          Quotes: 
          <input id='quotes' type='text' value={toonState.quotes} onChange={handleChange}/>
        </label>
        <button onClick={props.back}>Back</button>
        <button onClick={handleCreate}>Create</button>
        {uiFeedback.msg ? (<h6>{uiFeedback.msg}</h6>) : null}                        
      </form>
    </div>
  )
};

export default AddToon;