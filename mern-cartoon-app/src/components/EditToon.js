import React, { useState } from 'react'; 
import axios from 'axios';

function EditToon(props) {

  //Set up confirmation message logic to let user know the update was successful
  const [message, messageSetState] = useState( {display: false, text: ''} )

  //Create a component state from the toon passed in from props
  const [toonState, toonSetState] = useState(
    props.toon
  );
  
  //Handle imputs from the form 
  const handleChange = (e) => {
    e.persist();
    const changedField = e.target.id;
    toonSetState( (prevState => {
      prevState[changedField] = e.target.value;
      //TODO add a way to handle quotes, show and employer fields
      return {...prevState};
    }))
  }

  //Send post request with the updated cartoon to save to database
  const handleSave = (e) => {
    e.preventDefault();
    let data = toonState;
    data.sex === 'Male' ? data.sex = 1 : data.sex = 0;
    //for testing purposes debug in the show id TODO: add selection for this
    data.show = '5d76f1faa45a6fd435015b23'
    axios.post('http://localhost:3000/updateToon', data)
      .then( (toon) => {
        //return the user to Welcome page after 1 second
        setTimeout(props.back, 1000);
        //Inform the user the cartoon was updated
        messageSetState({'display': true, 'text': 'Cartoon ' + props.toon.first + " " + props.toon.last + " was updated successfully.  Returning to homepage."})
      })
      .catch( (err) => {
        messageSetState({'display': true, text: 'An error has occured, toon was not updated'})
      })   
  }

  const handleCancel = (e) => {
    console.log('cancel event fired');
  }

  return (
    <div>
      <h1> Edit Cartoon {props.toon.first + " " + props.toon.last} </h1>
      {message && <h2>{message.text}</h2>}
      <form>
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
        <div>
        <label>
          Quotes: 
          <input id='quotes' type='text' value={toonState.quotes} onChange={handleChange}/>
        </label>
        </div>
        <div>
          <button onClick={props.back}>Back</button>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>                      
      </form>
    </div>
  )
};

export default EditToon;