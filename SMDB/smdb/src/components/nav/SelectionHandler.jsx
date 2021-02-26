import React from 'react';

function SelectionHandler(props) {
  return (
    <div className="radio">
      <input id="movie" type="radio" name="item" defaultChecked onChange={() => props.handleRadio(0)} />
      <label htmlFor="movie" className="ml-2 mr-5">Movie</label>
      <input id="director" type="radio" name="item" onChange={() => props.handleRadio(1)} />   
      <label htmlFor="director" className="ml-2 mr-5">Director</label>
      <input id="actor" type="radio" name="item" onChange={() => props.handleRadio(2)} />      
      <label htmlFor="actor" className="ml-2 mr-5">Actor</label> 
    </div>
  )
}

export default SelectionHandler;