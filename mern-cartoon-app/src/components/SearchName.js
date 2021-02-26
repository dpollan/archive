import React, {useState} from 'react';
import axios from 'axios';

//Set up FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {faUserPlus} from '@fortawesome/free-solid-svg-icons'

library.add(faUserPlus)

function SearchName(props) {
  
  const [formState, formSetState] = useState({first: '', last: ''});

  const handleChange = (e) => {
    e.persist();
    const changeField = e.target.id;
    formSetState( (prevState => {
      prevState[changeField] = e.target.value;
      return {...prevState};
    }))
  }

  const handleFind = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3009/findToonByName', {first: formState.first, last: formState.last})
      .then((toon) => {
        props.toonSetState(toon.data);
        props.routerSetState({'component': 2})

      })
      .catch((err) => {
        console.error(err);
        props.routerSetState({'component': 404})
      })    
  }
  
  return (
    <div className="border border-primary p-3 my-2 bg-light">
      <form className="form-inline">
        <label className="m-3">
          First Name: 
          <input className="form-control ml-2" id='first' type='text' value={formState.first} onChange={handleChange} />
        </label>
        <label className="m-3">
          Last Name: 
          <input className="form-control ml-2" id='last' type='text' value={formState.last} onChange={handleChange} />
        </label>
        <button className="btn btn-primary" onClick={handleFind}>Find Toon</button>
        <button className="btn btn-outline-primary ml-3" onClick={props.handleAddClick}>
          Add <FontAwesomeIcon icon={faUserPlus} />
        </button>
      </form>
    </div>
  )
}

export default SearchName;