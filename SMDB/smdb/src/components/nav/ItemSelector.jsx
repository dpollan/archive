import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import SelectionHandler from './SelectionHandler.jsx';
import Axios from 'axios';

function ItemSelector() {
  
  //Set up initial state and create a legend for what item is being selected
  let legend = ['Movie', 'Director', 'Actor'];
  let {action} = useParams();
  const [selector, setSelector] = useState({
    input: '',
    item: 0,
    action
  });

  //redirect to Error403 if user is not signed in and tries to access anything other than the read route
  if (selector.action !== 'read') {
    if (!localStorage.getItem('username')){
      window.location = '/403';
    }
  }

  const handleChange = (e) => {
    e.persist();
    setSelector({input: e.target.value, item: selector.item, action: selector.action});
  }

  // For handling the radio controls we use a child component which needs access to our selection state.  We achieve this by passing the handleRadio function as a prop to our ItemRadioGroup component. Since the radio button controls the item selection we do not need to use prevState in the ItemSelector component as there will only ever be a single text input that changes. 

  const handleRadio = (selection) => {
    setSelector({input: '', item: selection, action: action})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let url = `/${action}${legend[selector.item]}/${selector.input}`;
    window.location = url;
  }

  //get the string for action into title case
  let titleCased = selector.action.split('');
  titleCased[0] = titleCased[0].toUpperCase();
  let titleCasedAction = titleCased.join('');

  return (
    <div className="container">
      <div className="card text-center">
        <h1 className="card-header">{titleCasedAction + " " + legend[selector.item]}</h1>
        <div className="card-body">
          <form>
            <div className="form-group">
              <div className={titleCasedAction === 'Create' ? "d-none" : "d-block"}>
                <label htmlFor="input" className="text-center my-0 h6">
                  {`${legend[selector.item]}${selector.item === 0 ? " Title: " : " Name: "}`}
                </label>
                <input className="form-control" id="input" type="text" value={selector.input} onChange={handleChange} />
              </div>
              <SelectionHandler selected={selector.item} handleRadio={handleRadio} />
            </div>
            <button onClick={handleSubmit} className="btn btn-outline-secondary">{`${titleCasedAction} ${legend[selector.item]}`}</button>            
          </form>        
        </div>
      </div>
    </div>
  )
}

export default ItemSelector;

