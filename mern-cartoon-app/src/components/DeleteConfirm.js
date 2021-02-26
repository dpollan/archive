import React from 'react';
import axios from 'axios';

function DeleteConfirm(props){

  function handleConfirm(e) {
    axios.post('http://localhost:3000/deleteToon', {_id: props._id})      
    .then((deleted) => {console.log('Cartoon deleted ' + deleted._id)})
    .catch((err) => console.error('Error ' + err));
    props.back();  
  }

  function handleCancel(e) {
    //Changing display state in Character component will trigger rerender
    props.toggleConfirm();
  }

  //TODO: Add styling so that dialog pops up in middle of screen on top of everythig

  return (
    <div>
     <h3>You are about to delete the cartoon {props.first + " " + props.last}.  This action is permanent.  Are you sure you want to delete this cartoon???</h3>
     <button onClick={handleConfirm}>Delete {props.first + " " + props.last}</button>
     <button onClick={handleCancel}>Cancel</button>
    </div>
  )
}
export default DeleteConfirm;