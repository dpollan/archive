import React from 'react';

function NotFound(props){

  return (
    <div>
     <h3>The Cartoon or show was not found in the database. Please check your spelling and ensure you have the name correct.  Feel free to add the cartoon or show to the database if neccessary</h3>
     <div>
      <button onClick={props.back}>Back</button>
     </div>
    </div>
  )
}
export default NotFound;